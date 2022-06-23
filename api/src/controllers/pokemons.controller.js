const axios = require("axios");
// const { getPokemonInfo } = require('../helpers/pokemonInfo');
const { Pokemon, Tipos } = require("../db");

const getPokemons = async (req, res) => {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=50"
  );
  const data = response.data.results.map((el) => el.url); ///data es un array  de urls

  const pokemonsInDB = await getPokemonsInDB() || [];  

  Promise.all(
    data.map((url) => axios.get(url).then((resp) => { //nombre, altura, vida, velocidad, defensa, ataque, peso
        return {
          nombre: resp.data.name,
          id: resp.data.id,
          peso: resp.data.weight,
          altura: resp.data.height,
          vida: resp.data.stats[0].base_stat,
          ataque: resp.data.stats[1].base_stat,
          defensa: resp.data.stats[2].base_stat,
          velocidad: resp.data.stats[5].base_stat,
          tipo: [ resp.data.types[0].type.name ],
          imagen: resp.data.sprites.other["official-artwork"]["front_default"]
        };
      })
    )
  )
    .then((pokedata) => {

      const data = pokedata.concat( pokemonsInDB );

      return res.json({
        data,
        // pokedata,
        msg: "multiples consultas",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        ok: false,
        msg: "no se pudo resolver la consulta",
        error,
      });
    });
};

const getPokemonById = async (req, res) => {
  const { id } = req.params;
  //TODO: ver si el id es de tipo uuid o si es simplemente un id numérico / Se ve que el uuid tiene más de 16 caracteres.
  try {
    if (id.length < 6) {//Si el id es chico entonces el pokemon pertenece à la api
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const resp = await axios.get(url);

      if (resp.data) { //si existe esa prop llamada data
        return res.status(200).json({
          ok: true,
          data:{
            nombre: resp.data.name,
            id: resp.data.id,
            peso: resp.data.weight,
            altura: resp.data.height,
            vida: resp.data.stats[0].base_stat,
            ataque: resp.data.stats[1].base_stat,
            defensa: resp.data.stats[2].base_stat,
            velocidad: resp.data.stats[5].base_stat,
            tipo: [ resp.data.types[0].type.name ],
            imagen: resp.data.sprites.other["official-artwork"]["front_default"]
          }
        });
      } else {
        return res.status(400).json({
          ok: false,
          msg: "La consulta no arrojó resultados",
          error: resp.error
        });
      }
    } else {//Si el id es muy extenso se trata de un uuid por lo que llamaremos a la BBDD de SQL
      const pokemon = await Pokemon.findOne({
        where:{ id },
        include:Tipos
      });

      const pokemonInDB = {
        ...pokemon.dataValues,
        tipo: pokemon.dataValues.tipos.map(e=> e.nombre) || ['desconocido']
      }

      return res.status(200).json({
        ok: true,
        data:{...pokemonInDB}
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
      error,
    });
  }
};

const getPokemonByName = async (req, res) => {
  const { nombre } = req.params;
  try {
    let pokemon = await Pokemon.findOne({ //primero busca en la bdd
      where: {
        nombre,
      },
      include:Tipos
    });

    //console.warn('esta es la consulta que viene de sequalize',pokemon);

    if (!pokemon) { //si no esta en la bdd entonces pokemon es undefined y busca en la api
      const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
      const resp = await axios.get(url);

      if (resp.data) { //axios siempre que la respuesta es satisfactoria deuvelve la propiedad data que es donde estan los datos de la api
        return res.status(200).json({
          ok: true,
          data:{
            nombre: resp.data.name,
            id: resp.data.id,
            peso: resp.data.weight,
            altura: resp.data.height,
            vida: resp.data.stats[0].base_stat,
            ataque: resp.data.stats[1].base_stat,
            defensa: resp.data.stats[2].base_stat,
            velocidad: resp.data.stats[5].base_stat,
            tipo: [ resp.data.types[0].type.name ],
            imagen: resp.data.sprites.other["official-artwork"]["front_default"]
          }
        });
      } else {
        return res.status(400).json({
          ok: false,
          msg: "La consulta no arrojó resultados",
          error: response.error,
        });
      }
    } else{ //Si el pokemon sí existe en la base de datos

        const pokemonInDB = {
          ...pokemon.dataValues,
          tipo: pokemon.dataValues.tipos.map(e=> e.nombre) || ['desconocido']  //['fire','normal']
        }

        return res.status(200).json({
            ok: true,
            data:{...pokemonInDB }
          });
    }
  } catch (error) {
    /*return res.status(400).json({
      ok: false,
      msg: "Por favor hable con el administrador",
      error,
    });*/
    return res.send("no encontro pokemon")
  }
};

const getPokemonsType = async (req, res) => {
  try {
    const type = await Tipos.findAll();
    console.log(type);

    if (!type.length) {
      const url = `https://pokeapi.co/api/v2/type`;
      const response = await axios.get(url);

      await response.data.results.forEach(async (tipo) => {
        await Tipos.create({
          nombre: tipo.name,
        });
      });
      return res.status(200).json({
        ok: true,
        type: response.data, //type de  la api
      });
    } else {
      return res.status(200).json({
        ok: true,
        type, //type de la bdd
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
      error,
    });
  }
};

const createPokemon = async (req, res) => {
  const { nombre, altura, vida, velocidad, defensa, ataque, peso, tipo, imagen } = req.body;

  try {
    const newPokemon = await Pokemon.create({
      nombre,
      altura,
      vida,
      velocidad,
      defensa,
      ataque,
      peso,
      imagen
    });

    //vincula con la tabla pivot
    await tipo.map( async (el) => {
      const tipoInDB = await Tipos.findOne({ //guarda en la variable tipoInDB los tipos de la tabla Tipoque sean iguales al array tipo que viene por body
           where:{
             nombre:el
           }
         });
      await newPokemon.addTipos(tipoInDB);  //crea la relación entre tipo y pokemon 
    });

    return res.status(200).json({
      msg: "pokemon creado con exito",
      newPokemon,
    });
  } catch (error) {
    console.log(error);
  }
};

async function getPokemonsInDB(){
  const result = await Pokemon.findAll({
    include: {
      model: Tipos,
      attributes: ["nombre"],
      through: {
        attributes: [],
      },
    },
  });

  console.log(result);
  resultPokemons = result.map((pokemon) => {
    console.log(pokemon);
    return {
      id: pokemon.id,
      nombre: pokemon.nombre,
      imagen: pokemon.imagen,
      peso: pokemon.peso,
      vida: pokemon.vida,
      altura: pokemon.altura,
      velocidad: pokemon.velocidad,
      defensa: pokemon.defensa,
      ataque: pokemon.ataque,
      tipo: pokemon.tipos.map((e)=>e.dataValues.nombre) || ['desconocido'] //['fire','normal']        deuvelvo un array de solo los nombres de los  tipos
    };
  });

  return resultPokemons;
};

module.exports = {
  getPokemons,
  getPokemonById,
  getPokemonByName,
  getPokemonsType,
  createPokemon,
  getPokemonsInDB
};

// const arrayURL = await response.data.results.map( pokemon => pokemon.url );
// const pk = [...response.data.results];
// const pokemosDetail = await Promise.all( arrayURL.map( (url) => axios.get(url)));
// const data = await Promise.all(
//     pk.map((pokemon) => axios.get(pokemon.url)) //genero un array de promesas
//   );

// let arrPokemons = [];
// console.log(pokemosDetail);
// data.forEach((pokemon) => {
//     arrPokemons.push({
//       ...getPokemonData(pokemon), //obtenemos la data y la guardamos en el array de pokemons
//     });
// });


/*


const getDataBaseInfo = async () => {
  const recipes = await Recipe.findAll({
    include: {
      model: TipoDeDieta,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  returnRecipes = recipes.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      imagen: recipe.imagen,
      resumen: recipe.resumen,
      puntuacion: recipe.puntuacion,
      nivel: recipe.nivel,
      dieta: recipe.TipoDeDieta,
      pasoApaso: recipe.instructions,
    };
  });

  return returnRecipes;
};


*/


