import LoginRecords from "./LoginRecords"
import Messages from "./Messages"
import Prayers from "./Prayers"
import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import messageService from "../services/messages"
import prayerService from "../services/prayers"


const Admin = ({ admin }) => { 

  const padding = {
    padding: 5
  }
  
  const [messages, setMessages] = useState([])
  const [prayers, setPrayers] = useState([])
  
  useEffect(() => {
    if (admin) {
      messageService
        .getAllMessages()
        .then(response => {
          setMessages([...response].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
        })
        .catch(error => {
          console.error('Failed to fetch messages:', error)
        })
    }
  }, [admin])


    useEffect(() => {
      if (admin) {
        prayerService
          .getAllPrayers()
          .then(response => {
            setPrayers([...response].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
          })
          .catch(error => {
            console.error('Failed to fetch prayers:', error)
          })
      }
    }, [admin])

  const unreadMessages = messages.filter(message => !message.seen).length
  const unreadPrayers = prayers.filter(prayer => !prayer.seen).length
    
  return (
    <div>
      <div>
        <Link style={padding} to='/admin/viestit'>Viestit ({unreadMessages})</Link>
        <Link style={padding} to='/admin/rukous'>Rukouspyynnöt ({unreadPrayers})</Link>
        <Link style={padding} to='/admin/kirjautumishistoria'>Kirjautumishistoria</Link>
        
      </div>

      <Routes>
        <Route path='/viestit' element={
          <Messages messages={messages} setMessages={setMessages} />} />
        <Route path='/rukous' element={
          <Prayers prayers={prayers} setPrayers={setPrayers} />} />
        <Route path='/kirjautumishistoria' element={<LoginRecords admin={admin} />} />
      </Routes>
    </div>
  )
}

export default Admin