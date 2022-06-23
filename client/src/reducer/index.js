const initialState = {
    pokemons: [],
    allPokemons: [],
    typeOfPokemons: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_POKEMONS":
        return {
          ...state,
          pokemons: action.payload,
          allPokemons: action.payload, //llena estados con todos los personajes
          // typeOfPokemons: action.payload
        };
  
      case "FILTER_CREATED": //muestra los creados por mi o los existentes en la base de datos
      const createdFilter = action.payload === "created"? state.allPokemons.filter((el) => el.createdInDb)
            //: state.copyRecipes.filter((el) => !el.createdInDb);
            : state.allPokemons.filter((el) => !el.createdInDb)
        return {
          ...state,
          pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
          //recipes: action.payload === "created" ? createdFilter : state.allRecipes,
          //recipes: createdFilter,
        };
  
      case "FILTER_BY_TYPES":
        const allPokemons = state.allPokemons;
        const typeFiltered = action.payload === "all"? 
        allPokemons
        : allPokemons.filter((el) => 
             //el.dieta.includes(action.apyload)|| 
             el.tipo.map((e)=> e).includes(action.payload)   
             //el.dieta.map((e)=> action.payload.includes(e.name)) 

  
              );
        return {
          ...state,
          pokemons: typeFiltered,
        };
  
      case "SEARCH_POKEMON":
  
          return {
            ...state,
            pokemons: action.payload,
          };
        
      case "POST_RECIPE":
        return {
          ...state,
        };

      case "ORDER_BY_ATTACK":
        const sortedPokemnosAttack =
          action.payload === "attackMax"
            ? state.allPokemons.sort(function (a, b) {
                if (a.ataque < b.ataque) {
                  return 1;
                }
                if (b.ataque < a.ataque) {
                  return -1;
                }
                return 0;
              })
            : state.allPokemons.sort(function (a, b) {
                if (a.ataque < b.ataque) {
                  return -1;
                }
                if (b.ataque < a.ataque) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          pokemons: sortedPokemnosAttack,
        };

        case "ORDER_BY_NAME":
            const sortedPokemonsName =
              action.payload === "asc"
                ? state.allPokemons.sort(function (a, b) {
                    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                      return 1;
                    }
                    if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) {
                      return -1;
                    }
                    return 0;
                  })
                : state.allPokemons.sort(function (a, b) {
                    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                      return -1;
                    }
                    if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) {
                      return 1;
                    }
                    return 0;
                  });
            return {
              ...state,
              pokemons: sortedPokemonsName,
            };

        case "GET_POKEMONS_TYPES":
            return {
            ...state,
            typeOfPokemons: action.payload,
            };
            
        case "GET_DETAILS":
            return {
            ...state,
            details: action.payload,
            };

        default:
            return state;
    }
  }
  
  export default rootReducer;