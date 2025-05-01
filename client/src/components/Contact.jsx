import { useState } from "react"
import messageService from "../services/messages"

const Contact = () => {

    const [newMessageType, setNewMessageType] = useState('Yhteydenottopyyntö')
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newContent, setNewContent] = useState('')
    const [feedbackPublic, setFeedbackPublic] = useState(null)

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
    const handleFeedbackPublicChange = (event) => {
        setFeedbackPublic(event.target.value)
    }

    const sendMessage = (event) => {
        event.preventDefault()
        const newMessage = {
            messageType: newMessageType,
            name: newName,
            phoneNumber: newPhoneNumber,
            email: newEmail,
            content: newContent,
            feedbackPublic: feedbackPublic
        }
    
        messageService
          .createMessage(newMessage)
          .then(response => {
            setNewMessageType('Yhteydenottopyyntö')
            setMessages(messages.concat(response))
            setNewName('')
            setNewEmail('')
            setNewPhoneNumber('')
            setNewContent('')
            setFeedbackPublic(null)
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
                    value='Yhteydenottopyyntö'
                    checked={newMessageType === 'Yhteydenottopyyntö'}
                    onChange={(event) => {
                        handleMessageTypeChange(event)
                        setFeedbackPublic(null)
                      }}
                />
                
                <label htmlFor='yhteydenottopyynto'>Yhteydenottopyyntö</label><br />

                <input
                    type='radio'
                    id='palaute'
                    name='messageType'
                    value='Palaute'
                    checked={newMessageType === 'Palaute'}
                    onChange={(event) => {
                        handleMessageTypeChange(event)
                        setFeedbackPublic('Kyllä')
                      }}
                />

                <label htmlFor='palaute'>Palaute</label><br />

                <input
                    type='radio'
                    id='muu'
                    name='messageType'
                    value='Muu'
                    checked={newMessageType === 'Muu'}
                    onChange={(event) => {
                        handleMessageTypeChange(event)
                        setFeedbackPublic(null)
                      }}
                />

                <label htmlFor='muu'>Muu</label><br />

                Nimi: <input
                    value={newName}
                    onChange={handleNameChange}/><br></br>
                Puhelinnumero: <input
                    value={newPhoneNumber}
                    type='tel'
                    onChange={handlePhoneNumberChange}/><br></br>
                Sähköposti: <input
                    value={newEmail}
                    type='email'
                    onChange={handleEmailChange}/><br></br>
                Viesti: <input
                    value={newContent}
                    onChange={handleContentChange}/><br></br>


                {newMessageType === "Palaute" &&
                <div>

                    <p>Saako palautteen sisällön julkaista nettisivuillani ja/tai sosiaalisen median kanavillani?</p>
                    <input
                        type='radio'
                        id='kylla'
                        name='feedbackPublic'
                        value='Kyllä'
                        checked={feedbackPublic === 'Kyllä'}
                        onChange={handleFeedbackPublicChange}
                    />
                    
                    <label htmlFor='kylla'>Kyllä</label><br />

                    <input
                        type='radio'
                        id='ei'
                        name='feedbackPublic'
                        value='Ei'
                        checked={feedbackPublic === 'Ei'}
                        onChange={handleFeedbackPublicChange}
                    />

                    <label htmlFor='ei'>Ei</label><br />
                    </div>
                    

                }
                <button type='submit'>Lähetä</button>

            </form>
        </div>

    )
}

export default Contact