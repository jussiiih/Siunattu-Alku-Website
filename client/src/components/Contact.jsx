import { useState } from "react"
import messageService from "../services/messages"

const Contact = () => {

    const [newMessageType, setNewMessageType] = useState('yhteydenottopyynto')
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newContent, setNewContent] = useState('')
    const [messages, setMessages] = useState([])

    const handleMessageTypeChange = (event) => {
        setNewMessageType(event.target.value)
    }
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
            messageType: newMessageType,
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
        
    return (
        <div>
            <h2>Ota yhteyttä</h2>
            <form onSubmit={sendMessage}>
                <input
                    type='radio'
                    id='yhteydenottopyynto'
                    name='messageType'
                    value='yhteydenottopyynto'
                    checked={newMessageType === 'yhteydenottopyynto'}
                    onChange={handleMessageTypeChange}
                />
            <label htmlFor='yhteydenottopyynto'>Yhteydenottopyyntö</label><br />

            <input
                type='radio'
                id='palaute'
                name='messageType'
                value='palaute'
                checked={newMessageType === 'palaute'}
                onChange={handleMessageTypeChange}
            />
            <label htmlFor='palaute'>Palaute</label><br />

            <input
                type='radio'
                id='muu'
                name='messageType'
                value='muu'
                checked={newMessageType === 'muu'}
                onChange={handleMessageTypeChange}
            />
            <label htmlFor='muu'>Muu</label><br />

                Nimi: <input
                    value={newName}
                    onChange={handleNameChange}/><br></br>
                Puhelinnumero: <input
                    value={newPhoneNumber}
                    onChange={handlePhoneNumberChange}/><br></br>
                Sähköposti: <input
                    value={newEmail}
                    onChange={handleEmailChange}/><br></br>
                Viesti: <input
                    value={newContent}
                    onChange={handleContentChange}/><br></br>
                <button type='submit'>Lähetä</button>

            </form>
        </div>

    )
}

export default Contact