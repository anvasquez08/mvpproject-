import React from 'react';


const Collection = (props) => (
  <div>
  	{console.log('search props', props)}

    <h4 >Saved Collection</h4>
    {
      props.savedCollection.map( (pokemon) => {
    	return <div> 
				    <div>Name:{pokemon.name} </div> 
					<div>Ability: {pokemon.ability}</div>
					<img src={pokemon.image}/>
    		    </div>
    	})
    }
  </div>
)



export default Collection;

