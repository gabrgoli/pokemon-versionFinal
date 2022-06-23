import React from 'react';
import { useState  } from 'react';
import { getPokemonName } from '../actions';
import { useDispatch} from "react-redux"



export default function SearchBar (){
    const dispatch = useDispatch()
    const [name,setName]=useState("")


    function handleInputChange (e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
      if(!name){
        e.preventDefault()
        return alert("el nombre no puede ser vacio")
      }
        
        console.warn("este es el name: ", name);
        dispatch(getPokemonName(name))
        document.getElementById('buscador').value='' ; //vuelve a poner en blanco el buscador
        document.getElementById('buscador').placeholder='Buscar....' ; //vuelve a colocar el placeholder

    }

    return(
        <div>
            <input
                id='buscador'
                type = 'text'
                placeholder = "Buscar...."
                onChange = {(e)=> handleInputChange(e)}
                />
                <button type='submit' onClick={(e)=> handleSubmit(e)}> Buscar </button>
        </div>
    )
}