import messageService from "../services/messages"
import { useState, useEffect } from "react"

const Messages = ({ admin }) => { 
    const [messages, setMessages] = useState([])
    const [searchText, setSearchText] = useState("")
    const [showAllMessages, setShowAllMessages] = useState(true)
 
  
    const deleteMessage = (messageToBeRemoved) => {
      messageService
        .deleteMessage(messageToBeRemoved)
        .then(() => {
          setMessages(messages.filter(message => message.id !== messageToBeRemoved.id))
        })
    }

    const toggleSeenAttribute = id => {
      const messageToBeUpdated = messages.find(message => message.id === id)
      const changedMessage = { ... messageToBeUpdated, seen: !messageToBeUpdated.seen }
      messageService.changeSeenAttribute(changedMessage)
      .then(() => {
        setMessages(messages.map(message => 
          message.id !== id ? message : changedMessage
        ))
      })
      .catch(error => {
        console.error('Failed to toggle seen attribute:', error)
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
    
const sortMessages = (messageList, sortBy, direction = 'desc') => {
  const compareFunction = (a, b) => {
    if (a[sortBy] < b[sortBy]) return direction === 'asc' ? -1 : 1
    if (a[sortBy] > b[sortBy]) return direction === 'asc' ? 1 : -1
    return 0
  }
  setMessages(messageList.sort(compareFunction))
}

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value)
    if (event.target.value !== '') {
      setShowAllMessages(false)
    }
  }

  const messagesToShow = showAllMessages
    ? messages
    : messages.filter(message => message.content.toLowerCase().includes(searchText.toLowerCase()))


  return (
<div>
<label htmlFor="sortMessages">Lajittele</label>
<select
  name="sortMessages"
  onChange={e => {
    const value = e.target.value
    if (value === 'newestToOldest') {
      sortMessages([...messages], 'timestamp', 'desc')
    } else if (value === 'OldestToNewest') {
      sortMessages([...messages], 'timestamp', 'asc')
    } else if (value === 'NameAlpahmeticalAscenging') {
      sortMessages([...messages], 'name', 'asc')
    } else if (value === 'NameAlpahmeticalDescending') {
      sortMessages([...messages], 'name', 'desc')
    }

  }}
>
  <option value="newestToOldest">Uusimmasta vanhimpaan</option>
  <option value="OldestToNewest">Vanhimmasta uusimpaan</option>
  <option value="NameAlpahmeticalAscenging">Nimi A-Ö</option>
  <option value="NameAlpahmeticalDescending">Nimi Ö-Ä</option>
</select>

<form>
  Hae viestin sisällöstä: <input value={searchText} onChange={handleSearchTextChange}></input>
</form>


<table>
  <tbody>

    {messagesToShow.map(message => (
      <tr key={message.id}>
        <td>
          {new Date(message.timestamp).toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })}<br/>
          Aihe: {message.messageType}<br/>
          {message.messageType === "Palaute" && (
            <span>Palautteen saa julkaista: {message.feedbackPublic}</span>
          )}<br/>
          Nimi: {message.name}<br/>
          Viesti: {message.content}<br/>
          Puhelin: {message.phoneNumber}<br/>
          Sähköposti: {message.email}<br/>

        </td>
        <td style={{ backgroundColor: message.seen ? '#66ff66' : '#ff704d' }}>
        <div>
          {message.seen === true ? (
            <>
              <p>Nähty</p>
              <button onClick={() => toggleSeenAttribute(message.id)}>Merkitse lukemattomaksi</button>
            </>
          )
          : (
            <>
              <p>Ei nähty</p>
              <button onClick={() => toggleSeenAttribute(message.id)}>Merkitse luetuksi</button>
            </>
          )}
        </div>
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

</div>
  )
    
}

export default Messages