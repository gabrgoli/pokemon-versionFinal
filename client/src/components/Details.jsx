import React from "react";
import { Link , useParams, useNavigate} from "react-router-dom"

import { useDispatch , useSelector } from "react-redux"
import { useEffect } from "react";
import { getDetails } from "../actions";
//import styles from "../Styles/DetailRecipe.module.css"


export default function DetailRecipe(){
    
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    
    let detailsPokemon = useSelector((state) => state.details) //traigo del reducer los detalles

    function handleSubmit(e){
        e.preventDefault()
 //       [e.target.name]

        navigate("/home")
    }

    useEffect(() => {
        dispatch(getDetails( id ))// recipe.Id accedo al id del detalle
    },[dispatch])

    return (
        <div >
            <div>
            {
                ((!detailsPokemon)||(detailsPokemon.length === 0)) ? 
                    <div >
                        <p >Loading ...</p>
                    </div> 
                :
                    <div >
                        <h1 >Nombre: </h1>
                        <p name="nombre">{detailsPokemon.nombre}</p> 
                        <h1 >Imagen: </h1>
                        <img width = "350px" height="250px" src={detailsPokemon.imagen} alt="la imagen no se encuentra"/>
                        
                        <h3 >Ataque:</h3>
                        <p name="ataque">{detailsPokemon.ataque}</p>                         
                        <h3 >Vida</h3>
                        <p name="vida">{detailsPokemon.vida}</p>
                        <h3 >Defensa</h3>
                        <p name="defensa">{detailsPokemon.defensa}</p>
                        <h3 >Peso</h3>
                        <p name="peso">{detailsPokemon.peso}</p>
                        <h3 >Defensa</h3>
                        <p name="defensa">{detailsPokemon.defensa}</p>
                        <h3 >Altura</h3>
                        <p name="altura">{detailsPokemon.altura}</p>
                        <h3 >Velocidad</h3>
                        <p name="velocidad">{detailsPokemon.velocidad}</p>
                        <h3 >Tipo de Pokemon</h3>
                        <p >{detailsPokemon.tipo?.map(r => (<li >{r} </li>))}</p>
                    </div>
                    
                
            }
            </div>
            <div >
             
                    <button type='submit' onClick={(e) => handleSubmit(e)} >Go back!</button>
                    
        
                
            </div>
        </div>
    )

}