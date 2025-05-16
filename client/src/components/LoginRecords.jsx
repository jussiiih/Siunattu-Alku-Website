import loginService from "../services/login"
import { useState, useEffect } from "react"

const LoginRecords = ({ admin }) => { 
    const [loginRecords, setLoginRecords] = useState([])  
  
    const deleteLoginRecord = (recordToBeRemoved) => {
      loginService
        .deleteLoginRecord(recordToBeRemoved)
        .then(() => {
          setLoginRecords(loginRecords.filter(loginRecord => loginRecord.id !== recordToBeRemoved.id))
        })
    }

    const deleteAllLoginRecords = () => {
      loginService
        .deleteAllLoginRecords()
        .then(() => {
          setLoginRecords([])
        })
    }
  
    useEffect(() => {
      if (admin) {
        loginService
          .getLoginRecords()
          .then(response => {
            setLoginRecords(response)
          })
          .catch(error => {
            console.error('Failed to fetch LoginRecords:', error)
          })
      }
    }, [admin])
    


  return (
  <div>
    <button onClick={() => {
      if (window.confirm('Haluatko varmasti poistaa kaikki kirjaumistiedot?\n\nTätä toimintoa ei enää tämän jälkeen voi peruuttaa.')) {
      deleteAllLoginRecords()
      }}}>
      Poista kaikki kirjautumistiedot
    </button>
    {loginRecords.map(LoginRecord =>
      <div key={LoginRecord.id}>
      <p>
          Aika: {LoginRecord.timestamp}<br/>
          Käyttäjätunnus: {LoginRecord.username}<br/>
          IP-osoite: {LoginRecord.ip}<br/>
          UserAgent: {LoginRecord.userAgent}<br/>
          Sijainti: {LoginRecord.location}<br/>
      </p>
      <button onClick={() => deleteLoginRecord(LoginRecord)}>
          Poista kirjautumistieto
      </button>
      </div>
      )}
  </div>
  )
    
}

export default LoginRecords