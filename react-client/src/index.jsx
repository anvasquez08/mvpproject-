import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search.jsx';
import SearchList from './components/SearchList.jsx';
import Collection from './components/Collection.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      search: '',
      savedCollection: [],
      searchedCollection: []
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchedCollection = this.setSearchedCollection.bind(this)
    this.fetchPokemon = this.fetchPokemon.bind(this)
    this.addPokemon = this.addPokemon.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
    this.setsavedCollection = this.setsavedCollection.bind(this)
  }

  componentDidMount() {
  }

  onSearchChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  setSearchedCollection(val) {
    this.setState({
      searchedCollection : val
    })
  }

  setsavedCollection(val) {
    this.setState({
      savedCollection: val
    })
  }

  fetchPokemon(e, setSearchedCollection) {
    e.preventDefault()    
    let search = this.state.search

    axios.post('/fetchPokemon', {pokemon: search})
      .then((response) => {
        let arr = [...this.state.searchedCollection]
        arr.unshift(response.data)
        this.setSearchedCollection(arr)
      })
      .catch((err) => console.log('error',err))
    }


  addPokemon(pokemon, setsavedCollection, setSearchedCollection) {
    console.log('this is the search', pokemon)
    axios.post('/addPokemon', {type: pokemon})
      .then( (response)=> {
        this.setsavedCollection(response.data)
        let searchedCopy = this.state.searchedCollection.slice()
        searchedCopy = searchedCopy.slice(1)
        this.setSearchedCollection(searchedCopy)

      })
      .catch( (err) => {
        console.log(err)
      })
    }

  //post request to delete from database
  deletePokemon(pokemon) {

        
   /* axios.post('/deletePokemon', {pokemon: pokemon})
      .then( (response)=> {
        console.log(response)
      })
      .catch( (err) => {
        console.log(err)
      })*/
    }

  render () {
    return (
      <div>
        <Search 
                fetchPokemon={this.fetchPokemon} 
                changeSearchHandler={this.onSearchChange}
                input={this.state.search}
                addPokemon={this.addPokemon}/>
        <SearchList 
                searchedCollection={this.state.searchedCollection}
                addPokemon={this.addPokemon}/>
        <Collection 
                deletePokemon={this.deletePokemon}
                savedCollection={this.state.savedCollection}/>
       </div>
       )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));