import { useState, useEffect } from 'react';
import TypeCard from './TypeCard.jsx';
import {
  getFullPokedexNumber,
  getPokedexNumber,
  formatPokemonName,
} from '../utils';

const PokeCard = ({ selectedPokemon }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { name, height, abilities, stats, types, moves, sprites } = data || {};
  const imgList = Object.keys(sprites || {}).filter((key) => {
    if (!sprites[key] || ['versions', 'other'].includes(key)) {
      return false;
    }

    return true;
  });

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
        <h2>{formatPokemonName(name)}</h2>
      </div>
      <div className='type-container'>
        {types.map((typeObj, typeIndex) => {
          const typeName = typeObj?.type?.name;

          return <TypeCard key={typeIndex} type={typeName} />;
        })}
      </div>
      <img
        className='default-img'
        src={`/pokemon/${getFullPokedexNumber(selectedPokemon)}.png`}
        alt={`${name}-large-img`}
      />
      <div className='img-container'>
        {imgList.map((spriteUrl, spriteIndex) => (
          <img
            key={spriteIndex}
            src={sprites[spriteUrl]}
            alt={`${name}-img-${spriteUrl}`}
          />
        ))}
      </div>
      <h3>Stats</h3>
      <div className='stats-card'>
        {stats.map((statObj, statIndex) => {
          const statName = statObj?.stat?.name.replaceAll('-', ' ');
          const baseStat = statObj?.base_stat;

          // statIndex === 0 && console.log(statObj);

          return (
            <div key={statIndex} className='stat-item'>
              <p>{statName}</p>
              <h4>{baseStat}</h4>
            </div>
          );
        })}
      </div>
      <h3>Moves</h3>
      <div className='pokemon-move-grid'>
        {moves.map((moveObj, moveIndex) => {
          const moveName = moveObj?.move?.name.replaceAll('-', ' ');

          // moveIndex === 0 && console.log(moveObj);

          return (
            <button
              key={moveIndex}
              className='button-card pokemon-move'
              onClick={() => {}}
            >
              <p>{moveName}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PokeCard;
