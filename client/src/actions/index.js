import axios from "axios";


export function getPokemons() {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/pokemons"); //LA RUTA QUE ME CREE EN EL BACK que trae todas los pokemons
      return dispatch({
        type: "GET_POKEMONS",
        payload: json.data.data,
      });
    };
}


export function getTypes() {
    return async function (dispatch) {
      // try {
      var json = await axios.get("http://localhost:3001/pokemonstype");
      return dispatch({
        type: "GET_POKEMONS_TYPES",
        payload: json.data.type,
      });
    };
  }

  export function filterByType(payload) {
    // el payload en este caso significa el value="..." que yo le mande desde el componente, osea el nombre de la dieta
    return {
      type: "FILTER_BY_TYPES",
      payload,
    };
  }

  export function filterCreated(payload) {
    return {
      type: "FILTER_CREATED",
      payload,
    };
  }

  export function orderByName(payload) {
    return {
      type: "ORDER_BY_NAME",
      payload,
    };
  }


  export function orderByAttack(payload) {
    return {
      type: "ORDER_BY_ATTACK",
      payload,
    };
  }

  export function getPokemonName(name) {
    //buscar pokemon por nombre
    return async function (dispatch) {
      try {
        var json = await axios.get(`http://localhost:3001/pokemon/${name}`);
        console.warn('resp en el action',json);
    
        return dispatch({
          type: "SEARCH_POKEMON",
          payload: [json.data.data], //el json.data es lo que devuelve la ruta
        });
      } catch (error) {
        console.error(error);
      }
    };
  }


  export function createPokemon(payload) {
    return async function (dispatch) {
      //este dispatch no lo use, ver que pasa si lo borro
      try {
        console.table('pokemon a crear: ', payload);
        var json = await axios.post(`http://localhost:3001/pokemon`, payload);
        return json;
      } catch (error) {
        console.log(error);
      }
    };
  }
  

  export function getDetails(id) {
    return async function (dispatch) {
      try {
        var json = await axios.get(`http://localhost:3001/pokedetail/${id}`);
        return dispatch({
          type: "GET_DETAILS",
          payload: json.data.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }