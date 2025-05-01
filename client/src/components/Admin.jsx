import messageService from "../services/messages"
import loginService from "../services/login"
import { useState, useEffect } from "react"

const Admin = () => { 
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
    
    const loginForm = () => {
        return (
        <form onSubmit={handleLogin}>
        <div>
            Käyttäjätunnus:
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
            Salasana:
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type="submit">OK</button>   
    </form>
    )}

    const messageList = () => {
        return (
        messages.map(message =>
            <div key={message.id}>
            <p>
                {message.timestamp}<br/>
                Aihe: {message.messageType}<br/>
                {message.messageType === "Palaute" && <p>Palautteen saa julkaista: {message.feedbackPublic}</p>}
                Nimi: {message.name}<br/>
                Viesti: {message.content}<br/>
                Puhelin: {message.phoneNumber}<br/>
                Sähköposti: {message.email}<br/>
            </p>
            <button onClick={() => deleteMessage(message)}>
                Poista viesti
            </button>
            </div>
            )
        )
    }
    
    return (
        <>
            { !admin && loginForm() }
            { admin && messageList() }
        </>

    )
}

export default Admin