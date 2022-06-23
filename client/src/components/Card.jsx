import React from "react";
//import styles from "../Styles/SingleCard.module.css"


export default function Card({image,nombre,tipo,vida,ataque}){


    

    return (
        <div >
            <div>
                <h3 >{nombre}</h3>
                <img src={image} width = "350px" height="250px" alt="la imagen no se encuentra "/>
                <div>Vida: {vida}</div>
                <div>Ataque: {ataque} </div>
                <div>Tipo: {tipo.map(t => <span key={ t }>{ t },</span>)}</div>
            </div>
        </div>
    )
}