var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pokemon');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var pokemonSchema = mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  ability: String 
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);

new Pokemon ({
  id: 2, 
  name: 'ivysaur',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png', 
  ability: 'chlorophyll'
}).save((err)=> {
    if ( err ) {
      console.log('error: ', err);
    } else {
      console.log('success')
    }
  })


module.exports = Pokemon;