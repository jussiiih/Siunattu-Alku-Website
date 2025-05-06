import { useState } from "react"
import { Link } from 'react-router-dom'

const Menu = () => {
  const [menuVisible, setMenuVisible] = useState(false)

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible)
  }

  const handleLinkClick = () => {
    setMenuVisible(false)
  }

  return (
    <div className="menu-container">
      <button onClick={toggleMenuVisibility} className="menu-toggle">
        <img
          src={menuVisible ? "../images/close_menu.png" : "../images/menu.png"}
          alt={menuVisible ? "Sulje valikko" : "Valikko"}
          className="menu-button"
        />
      </button>

      <nav className={`menu-dropdown ${menuVisible ? 'open' : ''}`}>
        <Link className='menu-link' to='/' onClick={handleLinkClick}>Etusivu </Link>
        <Link className='menu-link' to='/hinnasto' onClick={handleLinkClick}>Hinnasto</Link>
        <Link className='menu-link' to='/ennimaria' onClick={handleLinkClick}>Enni-Maria</Link>
        <Link className='menu-link' to='/mikadoula' onClick={handleLinkClick}>Mikä doula?</Link>
        <Link className='menu-link' to='/yhteys' onClick={handleLinkClick}>Ota yhteyttä</Link>
        <Link className='menu-link' to='/rukous' onClick={handleLinkClick}>Rukous</Link>
      </nav>
    </div>
  )
}

export default Menu
