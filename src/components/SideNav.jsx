import { useState } from 'react';
import { first151Pokemon, getFullPokedexNumber } from '../utils';

const SideNav = ({ selectedPokemon, setSelectedPokemon }) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredPokemon = first151Pokemon.filter(
    (pokemonName, pokemonIndex) => {
      if (getFullPokedexNumber(pokemonIndex).includes(searchValue)) {
        return true;
      }

      if (pokemonName.toLowerCase().includes(searchValue)) {
        return true;
      }

      return false;
    }
  );

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <nav>
      <div className='header'>
        <h1 className='text-gradient'>Pokédex</h1>
      </div>
      <input
        type='text'
        value={searchValue}
        placeholder='Search'
        onChange={(e) => {
          handleSearchInput(e);
        }}
      />
      {filteredPokemon.map((pokemon, pokemonIndex) => {
        const pokedexNumber = first151Pokemon.indexOf(pokemon);

        return (
          <button
            key={pokemonIndex}
            className={`${
              pokemonIndex === selectedPokemon
                ? 'nav-card nav-card-selected'
                : 'nav-card'
            }`}
            onClick={() => setSelectedPokemon(pokedexNumber)}
          >
            <p>{getFullPokedexNumber(pokedexNumber)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
};

export default SideNav;
