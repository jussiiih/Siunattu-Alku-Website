import { useState } from "react"
import messageService from "../services/messages"
import ErrorMessage from "./ErrorMessage"
import ScreenMessage from "./ScreenMessage"

const Contact = () => {

    const [newMessageType, setNewMessageType] = useState('Yhteydenottopyyntö')
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newContent, setNewContent] = useState('')
    const [feedbackPublic, setFeedbackPublic] = useState(null)
    const [messages, setMessages] = useState([])
    
    const [screenMessage, setScreenMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


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

        if (newMessageType !== "Palaute" && newEmail === "" && newPhoneNumber === "") {
            const confirmSend = window.confirm(
                'Et ole jättänyt puhelinnumeroasi tai sähköpostiosoitettasi.\n\nHuomaathan, että en pysty ottaamaan sinuun yhteyttä.\n\nLähetetäänkö viesti silti?'
            )
            if (!confirmSend) return
        }
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
            setErrorMessage(null)
            setScreenMessage('Viestin lähettäminen onnistui')
            setTimeout(() => {
                setScreenMessage(null)
            }, 10000)
          })
          .catch(error => {
            setScreenMessage(null)
            setErrorMessage('Viestin lähettäminen epäonnistui')
            setTimeout(() => {
                setErrorMessage(null)
            }, 10000)
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

                Nimi/Nimimerkki: <input
                    value={newName}
                    onChange={handleNameChange}/><br></br>
                
                {newMessageType !== "Palaute" &&
                <>
                Puhelinnumero: <input
                    value={newPhoneNumber}
                    type='tel'
                    onChange={handlePhoneNumberChange}/><br></br>
                
                
                Sähköposti: <input
                    value={newEmail}
                    type='email'
                    onChange={handleEmailChange}/><br></br>
                </>
                }
                Viesti:<br></br>
                <textarea
                    value={newContent}
                    onChange={handleContentChange}
                    rows={12}
                    cols={40}    
                />
                    <br></br>


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
                <ErrorMessage text={errorMessage}/>
                <ScreenMessage text={screenMessage} />
                <button type='submit'>Lähetä</button>

            </form>

        </div>

    )
}

export default Contact