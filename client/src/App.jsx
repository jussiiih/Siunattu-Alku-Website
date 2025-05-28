import Title from "./components/Title"
import Footer from "./components/Footer"
import Menu from "./components/Menu"

import Prices from "./components/Prices"
import Introduction from "./components/Introduction"
import Info from "./components/Info"
import Contact from "./components/Contact"
import HomePage from "./components/HomePage"
import Admin from "./components/Admin"
import PrayerRequest from "./components/PrayerRequest"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
    <header className="header-container">
      <div className="title-container">
        <Title/>
      </div>
      <Menu />
    </header>

      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/etusivu' element={<HomePage />} />
          <Route path='/hinnasto' element={<Prices />} />
          <Route path='/ennimaria' element={<Introduction />} />
          <Route path='/mikadoula' element={<Info />} />
          <Route path='/yhteys' element={<Contact />} />
          <Route path='/admin/*' element={<Admin />} />
          <Route path='/rukous' element={<PrayerRequest />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  )
}

export default App
