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

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newContent, setNewContent] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(null)

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

  const sendMessage = (event) => {
    event.preventDefault()
    const newMessage = {
      name: newName,
      phoneNumber: newPhoneNumber,
      email: newEmail,
      content: newContent
    }

    messageService
      .createMessage(newMessage)
      .then(response => {
        setMessages(messages.concat(response))
        setNewName('')
        setNewEmail('')
        setNewPhoneNumber('')
        setNewContent('')
      })
  }

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
        <Route path='/yhteys' element={<Contact
          newName={newName} handleNameChange={handleNameChange}
          newPhoneNumber={newPhoneNumber} handlePhoneNumberChange={handlePhoneNumberChange}
          newEmail={newEmail} handleEmailChange={handleEmailChange}
          newContent={newContent} handleContentChange={handleContentChange}
          sendMessage={sendMessage}/>}/>
        <Route path='/admin' element={<Admin
          messages={messages} deleteMessage={deleteMessage} handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} admin={admin} setAdmin={setAdmin}/>}/>

      </Routes>
      
      <Footer/>
    
    </Router>
  )
}

export default App