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
  loginRecords.map(LoginRecord =>
      <div key={LoginRecord.id}>
      <p>
          Aika: {LoginRecord.timestamp}<br/>
          Käyttäjätunnus: {LoginRecord.username}<br/>
          IP-osoite: {LoginRecord.ip}<br/>
          UserAgent: {LoginRecord.userAgent}<br/>
          Sijainti: {LoginRecord.location}<br/>
      </p>
      <button onClick={() => deleteLoginRecord(LoginRecord)}>
          Poista viesti
      </button>
      </div>
      )
  )
    
}

export default LoginRecords