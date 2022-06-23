import React from 'react';
//import { Link } from 'react-router-dom';
import styles from "../styles/Paginado.module.css"

export default function Paginado ({pokemonsPerPage,  allPokemons, paginado, paginaSeleccionada}){
    const pageNumber = []
    
    for (let i=1;i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumber.push(i)
    }

    if(allPokemons>1){
        return(
            <nav>
                <ul className={styles.barra}>
                    {pageNumber &&
                    pageNumber.map(number => (
                        <li key = {number} >
                            <span onClick = {()=> paginado(number)} >{number}</span>
                        </li>               
                    ))}
                </ul>
            </nav>
        )
    }else{
        return <div></div>//"cargando..."
    }


}