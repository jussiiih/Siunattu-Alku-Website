import Title from "./components/Title"
import Prices from "./components/Prices"
import Introduction from "./components/Introduction"
import Info from "./components/Info"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import HomePage from "./components/HomePage"

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from "react"


const App = () => {

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newContent, setNewContent] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }
  const handleEmailChange = (event) => {
    setNewEmail(event.target.value)
  }
  const handleContentChange = (event) => {
    setNewContent(event.target.value)
  }

  const sendMessage = (event) => {
    event.preventDefault()
    const newMessage = {
      name: newName,
      phoneNumber: newPhoneNumber,
      email: newEmail,
      content: newContent
    }
  }


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
        <Route path='/yhteys' element={<Contact
          newName={newName} handleNameChange={handleNameChange}
          newPhoneNumber={newPhoneNumber} handlePhoneNumberChange={handlePhoneNumberChange}
          newEmail={newEmail} handleEmailChange={handleEmailChange}
          newContent={newContent} handleContentChange={handleContentChange}
          sendMessage={sendMessage}/>}/>
      </Routes>
      
      <Footer/>
    
    </Router>
  )
}

export default App