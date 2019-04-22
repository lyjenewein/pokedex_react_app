import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import axios from 'axios';


export default class PokemonList extends Component {
    state = {
        url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151', //URL to call pokemon
        pokemon: null //where to save the file
    };

async componentDidMount(){
    //called when component has initialized variables - the state - and has been mounted to UI
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data['results']});
} //helps with when only one thing is changed not the whole side will reload, await makes it able so all cards can load at the same time 

  render() {
    return ( 
        <React.Fragment> 
        {this.state.pokemon ? (    <div className="row">
        {this.state.pokemon.map(pokemon => (
            <PokemonCard 
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
            />
        ))}
    </div>) : (<h1>Loading Pokemon</h1>
    )}
    </React.Fragment>
    );
    
  }
}

//react.fragment tells react this is like a div but when we go to load give me this next set 
//then we check if this.state.pokemon is true otherwise return value null aka Loading

