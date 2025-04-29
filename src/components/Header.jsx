const Header = ({ handleToggleMenu }) => {
  return (
    <header>
      <button className='open-nav-button' onClick={handleToggleMenu}>
        <i className='fa-solid fa-bars'></i>
      </button>
      <h1 className='text-gradient'>Pokédex</h1>
    </header>
  );
};

export default Header;
