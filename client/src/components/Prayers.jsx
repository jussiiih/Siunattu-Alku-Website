import prayerService from "../services/prayers"
import { useState, useEffect } from "react"

const prayers = ({ prayers, setPrayers }) => { 
  const [searchText, setSearchText] = useState("")  
  const [showAllPrayers, setShowAllPrayers] = useState(true)
  
  
  const deletePrayer = (prayerToBeRemoved) => {
    prayerService
      .deletePrayer(prayerToBeRemoved)
      .then(() => {
        setPrayers(prayers.filter(prayer => prayer.id !== prayerToBeRemoved.id))
      })
  }

  const toggleSeenAttribute = id => {
    const prayerToBeUpdated = prayers.find(prayer => prayer.id === id)
    const changedPrayer = { ... prayerToBeUpdated, seen: !prayerToBeUpdated.seen }
    prayerService.changeSeenAttribute(changedPrayer)
    .then(() => {
      setPrayers(prayers.map(prayer => 
        prayer.id !== id ? prayer : changedPrayer
      ))
    })
    .catch(error => {
      console.error('Failed to toggle seen attribute:', error)
    })
  }
  



const sortPrayers = (prayerList, sortBy, direction = 'desc') => {
  const compareFunction = (a, b) => {
    let valA = a[sortBy]
    let valB = b[sortBy]

    if (valA < valB) return direction === 'asc' ? -1 : 1
    if (valA > valB) return direction === 'asc' ? 1 : -1
    return 0
  }
  setPrayers([...prayerList].sort(compareFunction))
}

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value)
    if (event.target.value !== '') {
      setShowAllPrayers(false)
    }
  }

  const prayersToShow = showAllPrayers
    ? prayers
    : prayers.filter(prayer => prayer.content.toLowerCase().includes(searchText.toLowerCase()))

    


  return (
  <div>
    <label htmlFor="sortPrayers">Järjestä</label>
    <select
      id="sortPrayers"
      name="sortPrayers"
      onChange={e => {
        const value = e.target.value
        if (value === 'newestToOldest') {
          sortPrayers([...prayers], 'timestamp', 'desc')
        } else if (value === 'OldestToNewest') {
          sortPrayers([...prayers], 'timestamp', 'asc')
        }

      }}
    >
      <option value="newestToOldest">Uusimmasta vanhimpaan</option>
      <option value="OldestToNewest">Vanhimmasta uusimpaan</option>
    </select>

    <form>
      Hae viestin sisällöstä: <input value={searchText} onChange={handleSearchTextChange}></input>
    </form>



  <table>
    <tbody>
          {prayersToShow.map(prayer => (
      <tr key={prayer.id}>
        <td>
          {new Date(prayer.timestamp).toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })}<br/>
          Viesti: {prayer.content}<br/>
        </td>
        <td style={{ backgroundColor: prayer.seen ? '#66ff66' : '#ff704d' }}>
        <div>
          {prayer.seen === true ? (
            <>
              <p>Nähty</p>
              <button onClick={() => toggleSeenAttribute(prayer.id)}>Merkitse lukemattomaksi</button>
            </>
          )
          : (
            <>
              <p>Ei nähty</p>
              <button onClick={() => toggleSeenAttribute(prayer.id)}>Merkitse luetuksi</button>
            </>
          )}
        </div>
      </td>
        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
          <button onClick={() => {
            if (window.confirm(`Haluatko varmasti poistaa rukouspyynnön, joka jätetty ${new Date(prayer.timestamp).toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })}?\n\nRukouspyyntöä ei voida tämän jälkeen enää palauttaa.`)){
            deletePrayer(prayer)}}
          }>
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

export default prayers