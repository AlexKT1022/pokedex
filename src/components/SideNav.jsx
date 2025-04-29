import { useState } from 'react';
import { first151Pokemon, getFullPokedexNumber } from '../utils';

const SideNav = ({
  selectedPokemon,
  setSelectedPokemon,
  showSideMenu,
  handleCloseMenu,
}) => {
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
    <nav className={showSideMenu ? 'open' : ''}>
      <div className={showSideMenu ? 'header open' : 'header'}>
        <button className='open-nav-button' onClick={handleCloseMenu}>
          <i className='fa-solid fa-arrow-left-long'></i>
        </button>
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
            onClick={() => {
              setSelectedPokemon(pokedexNumber);
              handleCloseMenu();
            }}
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
