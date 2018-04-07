import React from 'react';


const Search = (props) => (
  <div>
    <h1>Catch Pokémon</h1>
      <form onSubmit={(e) => props.fetchPokemon(e)}>
        <label> Search:
          <input type='text' 
                 value={props.input} 
                 onChange={props.changeSearchHandler}/>
          </label>
         </form>
  </div>
)



export default Search;

/*
TO CREATE AN INPUT BOX
  1) in form div: include an onSumbit. It takes in an event and invokes the function with the 'e'
  2) in input div: include type:'text', value={props.input}, and onChange={props.changeSearchHandler}
  NOTE: Difference of onSumbit and onChange:
      - OnSubmit is the function of what the needs to be executed 
      - OnChange is the function that changes state with 
          this.setState({
            search: event.target.value
          })
*/