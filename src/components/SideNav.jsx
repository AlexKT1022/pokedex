import { first151Pokemon, getFullPokedexNumber } from '../utils';

const SideNav = ({ selectedPokemon, setSelectedPokemon }) => {
  return (
    <nav>
      <div className='header'>
        <h1 className='text-gradient'>Pokédex</h1>
      </div>
      <input type='text' />
      {first151Pokemon.map((pokemon, pokemonIndex) => (
        <button
          key={pokemonIndex}
          className={'nav-card'}
          onClick={() => setSelectedPokemon(pokemonIndex)}
        >
          <p>{getFullPokedexNumber(pokemonIndex)}</p>
          <p>{pokemon}</p>
        </button>
      ))}
    </nav>
  );
};

export default SideNav;
