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
            console.log(messages)
          })
          .catch(error => {
            console.error('Failed to fetch messages:', error)
          })
      }
    }, [admin])
    


  return (

<table>
  <tbody>
    {messages.map(message => (
      <tr key={message.id}>
        <td>
          {message.timestamp}<br/>
          Aihe: {message.messageType}<br/>
          {message.messageType === "Palaute" && (
            <span>Palautteen saa julkaista: {message.feedbackPublic}</span>
          )}<br/>
          Nimi: {message.name}<br/>
          Viesti: {message.content}<br/>
          Puhelin: {message.phoneNumber}<br/>
          Sähköposti: {message.email}<br/>

        </td>
        <td>
          <p>{message.seen === true ? "Nähty" : "Ei nähty"}</p>
      </td>
        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
          <button onClick={() => deleteMessage(message)}>
            Poista viesti
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  )
    
}

export default Messages