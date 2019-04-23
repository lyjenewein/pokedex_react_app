import React, { Component } from 'react';
import{Link} from 'react-router-dom';

import styled from 'styled-components';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;
//style with sprite

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); 
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover{
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  margin-bottom:1em;
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;
//style for the card


const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
//style of links

export default class PokemonCard extends Component {
    state = {
      name: '',
      imageUrl: '',
      pokemonIndex: '',
      imageLoading: true,
      toManyRequests: false
    };

    componentDidMount() {
        const { name, url } = this.props;
    
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        //const imageUrl = `./sprites/pokemon/${pokemonIndex}.png`;
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    
        this.setState({ name, imageUrl, pokemonIndex });
      }

      //creating object for pokemoncard components and then calling the API sprites for name, URL and index number 
    
  render() {

    return (
      <div className='col-md-3 col-sm-6 nb-5'>
      <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
        <Card className="card">
            <h5 className="card-header">{this.state.pokemonIndex}</h5>
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              src={this.state.imageUrl}
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
              style={
                this.state.toManyRequests
                  ? { display: 'none' }
                  : this.state.imageLoading
                  ? null
                  : { display: 'block' }
              }
            />

            <div class="card-body mx-auto">
                <h6 className="card-title">
                {this.state.name
                    .toLowerCase()
                    .split(" ")
                    .map(
                        letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                        )
                    .join(" ")}</h6>
            </div>
        </Card>
        </StyledLink>
      </div>
    )
  }
}

//the function with uppercase makes the first letter uppercase and the others lower case 
//creating the rows, columns and the style of cards with bootstraps, telling the app also what to do if its loading 
//connecting and loading in the pokemonlist
