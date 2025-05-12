import prayerService from "../services/prayers"
import { useState, useEffect } from "react"

const prayers = ({ admin }) => { 
    const [prayers, setPrayers] = useState([])  
  
    const deletePrayer = (prayerToBeRemoved) => {
      prayerService
        .deletePrayer(prayerToBeRemoved)
        .then(() => {
          setPrayers(prayers.filter(prayer => prayer.id !== prayerToBeRemoved.id))
        })
    }
  
    useEffect(() => {
      if (admin) {
        prayerService
          .getAllPrayers()
          .then(response => {
            setPrayers(response)
          })
          .catch(error => {
            console.error('Failed to fetch prayers:', error)
          })
      }
    }, [admin])
    


  return (
  prayers.map(prayer =>
      <div key={prayer.id}>
      <p>{new Date(prayer.timestamp).toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })}<br/></p>
      <p>
          Rukouspyyntö: {prayer.content}<br/>
      </p>
      <button onClick={() => deletePrayer(prayer)}>
          Poista rukouspyyntö
      </button>
      </div>
      )
  )
    
}

export default prayers