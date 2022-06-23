const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getPokemons, getPokemonById, getPokemonByName, getPokemonsType, createPokemon } = require('../controllers/pokemons.controller');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons ); //localhost:3001/pokemons
router.get('/pokedetail/:id', getPokemonById ); //localhost:3001/pokedetail/:id
router.get('/pokemon/:nombre', getPokemonByName ); //localhost:3001/pokemons/:nombre
router.get('/pokemonstype', getPokemonsType ); //localhost:3001/pokemonstype
router.post('/pokemon', createPokemon ); //localhost:3001/pokemon

module.exports = router;
