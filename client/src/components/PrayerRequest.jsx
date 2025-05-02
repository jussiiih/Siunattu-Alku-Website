import { useState } from "react"
import prayerService from "../services/prayers"
import ErrorMessage from "./ErrorMessage"
import ScreenMessage from "./ScreenMessage"

const PrayerRequest = () => {
    const [newContent, setNewContent] = useState('')
    const [prayers, setPrayers] = useState([])
    
    const [screenMessage, setScreenMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleContentChange = (event) => {
        setNewContent(event.target.value)
    }

    const sendPrayer = (event) => {
        event.preventDefault()
        const newPrayer = {
            content: newContent,
        }
    
        prayerService
          .createPrayer(newPrayer)
          .then(response => {
            setPrayers(prayers.concat(response))
            setNewContent('')
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
            <h2>Voit jättää tähän rukouspyyntösi</h2>
            <form onSubmit={sendPrayer}>
                Rukouspyyntö: <br></br>
                <textarea
                    value={newContent}
                    onChange={handleContentChange}
                    rows={12}
                    cols={40}/><br></br>
                <button type='submit'>Lähetä</button>
            </form>
            <ErrorMessage text={errorMessage}/>
            <ScreenMessage text={screenMessage} />
        </div>

    )
}

export default PrayerRequest