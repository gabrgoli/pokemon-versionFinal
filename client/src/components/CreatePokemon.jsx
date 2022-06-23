import React, { useState, useEffect } from "react";
import { Link ,  useNavigate } from "react-router-dom"
import { createPokemon, getTypes } from "../actions"
import { useDispatch , useSelector } from "react-redux"
//import styles from "../Styles/CreateRecipe.module.css"

function validate(post){
    let errors = {} //creo un objeto vacio
    if (!post.nombre){ //si no hay nada en mi estado local
        errors.nombre = "Tu Pokemon necesita un nombre"
    } /*else if (!post.summary){ //si no hay nada
        errors.summary = "Brinda una pequeña descripcion de tu receta"
    } else if (!post.instructions){ //si no hay nada
        errors.instructions = "No te olvides de contar como la preparaste"
    }*/
    return errors
}

    
export default function CreatePokemon(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allTypes = useSelector((state) => state.typeOfPokemons)
   
    const [errors, setErrors] = useState({}) //estado local para manejar errores, objeto vacio

    const [post, setPost] = useState({
        nombre: "",
        vida: 500,
        ataque: 500,
        defensa: 500,
        velocidad: 500,
        altura: 500,
        peso: 500,
        image: "",
        types: []  
    })

    function handleChange(e){
        setPost({ //a mendida que escribo setea y va guardando
            ...post,
            [e.target.name]: e.target.value //va llenando el estado post a medida que va modificando
        })
        setErrors(validate({ //setea mi funcion errores pasando la funcion validate con variable post
            ...post,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        setPost({
            ...post,
            types: [...post.types, e.target.value] //guarda en el arreglo types los tipos de pokemon qe vaya seleccionando
        })

    }

    function handleDietDelete(e,deleteThis){
        e.preventDefault()
        //console.warn(deleteThis);
        setPost({
            ...post,
            types: post.types.filter(type => type !== deleteThis)
        })
    }

    function handleSubmit(e){
        if(!post.nombre){
            e.preventDefault()
            return alert("El Pokemon necesita un nombre")
        } else if(!post.types.length){
            e.preventDefault()
            return alert("Necesitas agregar por lo menos 1 tipo al Pokemon")
        } else {
            if (!post.image) {
                post.image = "https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                
                //https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_960_720.jpg
            }
            const newPost={
                nombre: post.nombre,
                vida: post.vida,
                ataque: post.ataque,
                defensa: post.defensa,
                peso: post.peso,
                altura: post.altura,
                velocidad: post.velocidad,
                imagen: post.image,
                tipo: post.types
            }
            dispatch(createPokemon(newPost))
            alert("Se creo el Pokemon exitosamente!")

            navigate("/home")
        }
    }

    useEffect(() => {
    
        dispatch(getTypes());

    }, [dispatch])
    


    return(
        <div >
            <Link to="/home" >
                <button >Home</button>
            </Link>
            <h1 >CREA TU PROPIA POKEMON</h1>
            <form >
                <div >
                    <label >Nombre</label>
                    <input  type="text" value={post.nombre} name="nombre" onChange={(e) => handleChange(e)} ></input>
                    {errors.nombre && (<p >{errors.nombre}</p>)} 
                </div> 
                <div >
                    <label >Vida</label>
                    <input  type="range" min="0" max="1000" value={post.vida} name="vida" onChange={(e) => handleChange(e)}></input>
                    {<p >{post.vida}</p>}
                </div>
                <div >
                    <label >Ataque</label>
                    <input  type="range" min="0" max="1000" value={post.ataque} name="ataque" onChange={(e) => handleChange(e)}></input>
                    {<p >{post.ataque}</p>}
                </div>
                <div >
                    <label >Defensa</label>
                    <input  type="range" min="0" max="1000" value={post.defensa} name="defensa" onChange={(e) => handleChange(e)}></input>
                    {<p >{post.defensa}</p>}
                </div>
                <div >
                    <label >Velocidad</label>
                    <input  type="range" min="0" max="1000" value={post.velocidad} name="velocidad" onChange={(e) => handleChange(e)}></input>
                    {<p >{post.velocidad}</p>}
                </div>
                <div >
                    <label >Peso</label>
                    <input  type="range" min="0" max="1000" value={post.peso} name="peso" onChange={(e) => handleChange(e)}></input>
                    {<p >{post.peso}</p>}
                </div>

                <div >
                    <label >Cargar url de la imagen</label>
                    <input  type="url" value={post.image} name="image" onChange={(e) => handleChange(e)}></input>
                </div>

                <div >
                    <select onChange={(e)=> handleSelect(e)}>
                        <option value="all" hidden name="types" >Selecciona tipo de Pokemon</option>
                            {allTypes?.map(type => {
                            return ( <option value={type.nombre} key={type.id}>{type.nombre}</option>)
                            })
                            } 
                    </select>
                    <ul>
                        <li>                            
                            {post.types.map(type => 
                            <div >
                                <p>{type}</p>
                                <button onClick={(e) => handleDietDelete(e,type)}>x </button>
                            </div>
                            )}
                        </li>
                    </ul>
                </div>
                <button  type="submit" onClick={(e) => handleSubmit(e)}>Crear Pokemon</button>
            </form>
        </div>
    )


}