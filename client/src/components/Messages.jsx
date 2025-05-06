import messageService from "../services/messages"
import { useState, useEffect } from "react"

const Messages = ({ admin }) => { 
    const [messages, setMessages] = useState([])  
  
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
    


  return (
  <table>
    {messages.map(message =>
            <>
      <tr>
        <td>
          {message.timestamp}<br/>
          Aihe: {message.messageType}<br/>
          {message.messageType === "Palaute" && <span>Palautteen saa julkaista: {message.feedbackPublic}</span>}<br/>
          Nimi: {message.name}<br/>
          Viesti: {message.content}<br/>
          Puhelin: {message.phoneNumber}<br/>
          Sähköposti: {message.email}<br/>
      </td>
      <td>
        <button onClick={() => deleteMessage(message)}>
            Poista viesti
        </button>
      </td>
      </tr>
      <br></br>
</>
    )
    }
      </table>
  )
    
}

export default Messages