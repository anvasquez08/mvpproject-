import React from 'react';
import Search from './Search.jsx';

const SearchList = (props) => (


  <div>
	{console.log(props)}
	<h4> Searched Pokemon</h4>
	{ 
  	props.searchedCollection.map((pokemon) => {
	  return <div> 
				<button onClick={(e)=>{props.addPokemon(pokemon)}}>Add To Collection</button>
				<div>Name:{pokemon.name} </div> 
				<div>Ability: {pokemon.ability}</div>
				<img src={pokemon.image}/>
			 </div>
			})
    }
  </div>
)

export default SearchList;