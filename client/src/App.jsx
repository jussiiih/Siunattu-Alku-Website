import Title from "./components/Title"
import Prices from "./components/Prices"
import Introduction from "./components/Introduction"
import Info from "./components/Info"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import HomePage from "./components/HomePage"
import Admin from "./components/Admin"

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import messageService from "./services/messages"
import loginService from "./services/login"

const App = () => {

  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const user = await loginService.login({
          username,
          password,
        })
        messageService.setToken(user.token);
        setAdmin(user)
        setUsername('')
        setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  };



  const deleteMessage = (messageToBeRemoved) => {
    messageService
      .deleteMessage(messageToBeRemoved)
      .then(() => {
        setMessages(messages.filter(message => message.id !== messageToBeRemoved.id))
      })
  }

  useEffect(() => {
    if (admin) {
      messageService
        .getAllMessages()
        .then(response => {
          setMessages(response)
        })
        .catch(error => {
          console.error('Failed to fetch messages:', error)
        })
    }
  }, [admin])

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
        <Route path='/admin' element={<Admin
          messages={messages} deleteMessage={deleteMessage} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} admin={admin} setAdmin={setAdmin}/>}/>

      </Routes>
      
      <Footer/>
    
    </Router>
  )
}

export default App