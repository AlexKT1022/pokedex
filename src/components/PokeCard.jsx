import { useState, useEffect } from 'react';
import TypeCard from './TypeCard.jsx';
import { getFullPokedexNumber, getPokedexNumber } from '../utils';

const PokeCard = ({ selectedPokemon }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { name, height, abilities, stats, types, moves, sprites } = data || {};

  useEffect(() => {
    let cache = {};
    const fetchPokemonData = async () => {
      setLoading(true);

      try {
        const pokedexNumber = getPokedexNumber(selectedPokemon);
        const reqUrl = `https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`;
        const res = await fetch(reqUrl);
        const pokemonData = await res.json();

        setData(pokemonData);

        cache[selectedPokemon] = pokemonData;

        console.log(pokemonData);

        localStorage.setItem('pokedex', JSON.stringify(cache));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    // if loading, exit logic
    if (loading || !localStorage) {
      return;
    }

    // define the cache
    if (localStorage.getItem('pokedex')) {
      cache = JSON.parse(localStorage.getItem('pokedex'));
    }

    // check if selected pokemon is in cache, otherwise fetch from API
    if (selectedPokemon in cache) {
      setData(cache[selectedPokemon]);

      return;
    }

    // save information from API to cache
    fetchPokemonData();
  }, [selectedPokemon]); // triggers when selectedPokemon changes

  if (loading || !data) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className='poke-card'>
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>
      <div className='type-container'>
        {types.map((type, typeIndex) => (
          <TypeCard key={typeIndex} type={type?.type?.name} />
        ))}
      </div>
    </div>
  );
};

export default PokeCard;
