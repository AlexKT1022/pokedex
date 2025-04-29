import { useState, useEffect } from 'react';
import TypeCard from './TypeCard.jsx';
import {
  getFullPokedexNumber,
  getPokedexNumber,
  formatPokemonName,
} from '../utils';
import Modal from './Modal.jsx';

const PokeCard = ({ selectedPokemon }) => {
  const [data, setData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [selectedMove, setSelectedMove] = useState(null);
  const [loadingMove, setLoadingMove] = useState(false);

  const { name, height, abilities, stats, types, moves, sprites } = data || {};
  const imgList = Object.keys(sprites || {}).filter((key) => {
    if (!sprites[key] || ['versions', 'other'].includes(key)) {
      return false;
    }

    return true;
  });

  const fetchMoveData = async (moveInfo) => {
    let moveCache = {};

    if (loadingMove || !localStorage || !moveInfo) {
      return;
    }

    if (localStorage.getItem('pokemon-moves')) {
      moveCache = JSON.parse(localStorage.getItem('pokemon-moves'));
    }

    if (moveInfo.name in moveCache) {
      setSelectedMove(moveCache[moveInfo.name]);

      console.log(`Move ${moveInfo.name} found in cache.`);

      return;
    }

    try {
      setLoadingMove(true);

      const res = await fetch(moveInfo.url);
      const moveData = await res.json();

      console.log(`Move ${moveInfo.name} fetched from API.`);

      const description = moveData?.flavor_text_entries.find(
        (entry) =>
          entry.language.name === 'en' &&
          entry.version_group.name === 'firered-leafgreen'
      ).flavor_text;
      const moveDescription = {
        name: moveData.name,
        description,
      };

      setSelectedMove(moveDescription);

      moveCache[moveData.name] = moveDescription;

      localStorage.setItem('pokemon-moves', JSON.stringify(moveCache));
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingMove(false);
    }
  };

  useEffect(() => {
    let cache = {};
    const fetchPokemonData = async () => {
      setLoadingData(true);

      try {
        const pokedexNumber = getPokedexNumber(selectedPokemon);
        const reqUrl = `https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`;
        const res = await fetch(reqUrl);
        const pokemonData = await res.json();

        setData(pokemonData);

        cache[selectedPokemon] = pokemonData;

        console.log(`Pokemon ${pokemonData.name} fetched from API.`);

        localStorage.setItem('pokedex', JSON.stringify(cache));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoadingData(false);
      }
    };

    // if loading, exit logic
    if (loadingData || !localStorage) {
      return;
    }

    // define the cache
    if (localStorage.getItem('pokedex')) {
      cache = JSON.parse(localStorage.getItem('pokedex'));
    }

    // check if selected pokemon is in cache, otherwise fetch from API
    if (selectedPokemon in cache) {
      setData(cache[selectedPokemon]);

      console.log(`Pokemon ${cache[selectedPokemon].name} found in cache.`);

      return;
    }

    // save information from API to cache
    fetchPokemonData();
  }, [selectedPokemon]); // triggers when selectedPokemon changes

  if (loadingData || !data) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className='poke-card'>
      {selectedMove && (
        <Modal
          handleCloseModal={() => {
            setSelectedMove(null);
          }}
        >
          <div>
            <h6>Name</h6>
            <h2 className='skill-name'>
              {selectedMove.name.replaceAll('-', ' ')}
            </h2>
          </div>
          <div>
            <h6>Description</h6>
            <p>{selectedMove.description}</p>
          </div>
        </Modal>
      )}
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
          const moveInfo = moveObj?.move;
          const moveName = moveInfo.name.replaceAll('-', ' ');

          // moveIndex === 0 && console.log(moveObj);

          return (
            <button
              key={moveIndex}
              className='button-card pokemon-move'
              onClick={() => {
                fetchMoveData(moveInfo);
              }}
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
