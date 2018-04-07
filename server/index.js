const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mongo');
const axios = require('axios');
let db = require('../database-mongo/index.js')


let app = express();
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../react-client/dist'));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

app.post('/fetchPokemon', (req, res) => {
	let pokename = req.body.pokemon.toLowerCase()
	pokemonFetcher(pokename, function(result) {
		res.send(result)
	})
})

/*app.get('/', (req, res) => {
	console.log('this is get request')
	res.status(201)
})*/


// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.post('/addPokemon', (req, res) => {
	let obj = req.body.type;
	let newObj = new db(obj)
	newObj.save()

    db.find({})
      .exec((err, results)=> res.json(results))
})

app.post('/deletePokemon', (req, res) => {
	let obj = req.body;
	db.remove(obj)
	  .find({})
	  .exec((err, results) => res.json(results))
})


const pokemonFetcher = (pokemon, cb) => {
	axios({
		method: 'GET',
		url: `http://pokeapi.co/api/v2/pokemon/${pokemon}`
	})
	.then(results => {
		var pokeObj = {}
		pokeObj.id = results.data.id
		pokeObj.name = results.data.name 
	    pokeObj.image = results.data.sprites.front_default || null
	    pokeObj.ability = results.data.abilities[0]['ability']['name'] || null
		cb(pokeObj)
	})
	.catch(err => {
		console.log('failed api request',err)
	})
}
