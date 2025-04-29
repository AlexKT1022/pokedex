import { useState } from 'react';
import Header from './components/Header.jsx';
import SideNav from './components/SideNav.jsx';
import PokeCard from './components/PokeCard.jsx';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowSideMenu((prevState) => !prevState);
  };

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <SideNav
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        showSideMenu={showSideMenu}
        handleToggleMenu={handleToggleMenu}
      />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  );
}

export default App;
