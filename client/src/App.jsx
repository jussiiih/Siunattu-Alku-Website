import Title from "./components/Title"
import Prices from "./components/Prices"
import Introduction from "./components/Introduction"
import Info from "./components/Info"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import HomePage from "./components/HomePage"
import Admin from "./components/Admin"

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <Title/>
      
      <div>
        <Link style ={padding} to='/'>Etusivu</Link>
        <Link style ={padding} to='/hinnasto'>Hinnasto</Link>
        <Link style ={padding} to='/ennimaria'>Enni-Maria</Link>
        <Link style ={padding} to='/mikadoula'>Mikä doula?</Link>
        <Link style ={padding} to='/yhteys'>Ota yhteyttä</Link>
      </div>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/hinnasto' element={<Prices/>}/>
        <Route path='/ennimaria' element={<Introduction/>}/>
        <Route path='/mikadoula' element={<Info/>}/>
        <Route path='/yhteys' element={<Contact/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
      
      <Footer/>
    
    </Router>
  )
}

export default App