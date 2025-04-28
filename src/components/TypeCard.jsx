import { pokemonTypeColors } from '../utils';

const TypeCard = ({ type }) => {
  const { background, color } = pokemonTypeColors[type];
  const styleOverride = {
    backgroundColor: background,
    color,
  };

  return (
    <div className='type-tile' style={styleOverride}>
      <p>{type}</p>
    </div>
  );
};

export default TypeCard;
