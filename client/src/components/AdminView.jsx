import LoginRecords from "./LoginRecords"
import Messages from "./Messages"
import Prayers from "./Prayers"
import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import messageService from "../services/messages"


const Admin = ({ admin }) => { 

  const padding = {
    padding: 5
  }
  
  const [messages, setMessages] = useState([])
  
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

  const unreadMessages = messages.filter(message => !message.seen).length
    
  return (
    <div>
      <div>
        <Link style={padding} to='/admin/viestit'>Viestit ({unreadMessages})</Link>
        <Link style={padding} to='/admin/rukous'>Rukouspyynnöt</Link>
        <Link style={padding} to='/admin/kirjautumishistoria'>Kirjautumishistoria</Link>
        
      </div>

      <Routes>
        <Route path='/viestit' element={
          <Messages admin={admin} messages={messages} setMessages={setMessages} />
        } />
        <Route path='/rukous' element={<Prayers admin={admin} />} />
        <Route path='/kirjautumishistoria' element={<LoginRecords admin={admin} />} />
      </Routes>
    </div>
  )
}

export default Admin