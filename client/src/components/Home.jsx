import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterCreated,
  getTypes,
  filterByType,
  orderByName,
  orderByAttack,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
//import styles from "../styles/Paginado.module.css"

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((State) => State.pokemons); //me trae del reducer el estado de recipes, que tiene todas las recetas
  const allTypes = useSelector((State) => State.typeOfPokemons);

  //PAGINADO
  const [currentPage, setCurrentPage] = useState(1); //creo un estado local en donde le paso la pagina actual
  const [PokemonsPerPage, setPokemonsPerPage] = useState(12); //cantidad de recetas por pagina
  const indexOfLastPokemon = currentPage * PokemonsPerPage; //porque si estoy en la pagina 3, el ultimo recipe va a ser 6*3=18
  const indexOfFirstPokemon = indexOfLastPokemon - PokemonsPerPage; //da el index del primer pokemon
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  ); //va mostrando cuantos recipes hay que rednerizar por pagina

  // estados locales para renderizar los globales
  const [aux, forzarRenderizado] = useState(""); //estado local que arranca vacio
  const [attack, setAttack] = useState("");

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleSortedPokemonsNames(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); //setea la pagina principal
    forzarRenderizado(e.target.value); //renderiza modificando el estado local, ordenado de tal forma, solo hace la modificacion en el renderizado
    //setorder('Ordenado ${e.target.value}')

    //guarda el valor d el criterio actual, max min o all, y verifica si hubo un cambio de valor y compara con el estado actual, si es diferente renderiza
  }

  
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        e.preventDefault();
    }

  function handleFilteredType(e) {
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
    e.preventDefault();
  }

  function handleSortedPokemonsAttack(e) {
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setAttack(e.target.value);
    e.preventDefault();
  }

  return (
    //se pasan los values iguales a la API
    <div>
      <Link to="/createpokemon">Crear Pokemon</Link>

      <h1>aguante los pokemons</h1>

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        volver a cargar los Pokemons
      </button>

      <select onChange={(e) => handleSortedPokemonsNames(e)}>
        <option value="">Select Order</option>
        <option value="asc">Ascendente</option>
        <option vale="desc">Descendente</option>
      </select>

      <select onChange={(e) => handleSortedPokemonsAttack(e)}>
        <option value="">Select Attack</option>
        <option value="attackMax">Maximo ataque</option>
        <option value="attackMin">Minimo ataque</option>
      </select>

      <select onChange={(e) => handleFilteredType(e)}>
        <option value="all">Seleccionar el tipo de Pokemon</option>
        {allTypes?.map((tipo) => {
          return <option value={tipo.nombre}>{tipo.nombre}</option>;
        })}
      </select>

      <select onChange={(e)=>handleFilterCreated}>
        <option value='All'>Todos</option>
        <option value='created'>Creados</option>
        <option value='api'>En la Api</option>
      </select>

<div>{currentPage}</div>

      <SearchBar key = {58}
                />

      <div>
        {
          <Paginado key = {54}
            pokemonsPerPage={PokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
            paginaSeleccionada={currentPage}
          ></Paginado>
        }
      </div>

 

      <div>
      {
      ((!currentPokemons)||(currentPokemons.length === 0)) ? 
                    <div >
                        <p >Loading ...</p>
                    </div> 
        :



        currentPokemons?.map((poke) => {
          return (
            <div key={poke.id}>
              <Link to={`/pokemon/${poke.id}`}>
                <Card
                  image={poke.imagen}
                  nombre={poke.nombre}
                  tipo={poke.tipo}
                  key={poke.id}
                  vida={poke.vida}
                  ataque={poke.ataque}
                ></Card>
              </Link>
            </div>
          );
        })
        
      
        }
      
      </div>

      <div>
        {
          <Paginado key = {56}
            pokemonsPerPage={PokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
            paginaSeleccionada={currentPage}
          ></Paginado>
        }
      </div>
    </div>
  );
}

/*
        (currentPokemons[0]=="noseencontro")?
        <div>
          <p >"noseencontro" ...</p>
        </div>
        :

*/