import { useState } from "react"
import { Link } from 'react-router-dom'

const Menu = () => {
  const [menuVisible, setMenuVisible] = useState(false)

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible)
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
        <Link className='menu-link' to='/'>Etusivu</Link>
        <Link className='menu-link' to='/hinnasto'>Hinnasto</Link>
        <Link className='menu-link' to='/ennimaria'>Enni-Maria</Link>
        <Link className='menu-link' to='/mikadoula'>Mikä doula?</Link>
        <Link className='menu-link' to='/yhteys'>Ota yhteyttä</Link>
        <Link className='menu-link' to='/rukous'>Rukous</Link>
      </nav>
    </div>
  )
}

export default Menu
