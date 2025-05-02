import LoginRecords from "./LoginRecords"
import Messages from "./Messages"
import Prayers from "./Prayers"
import { Routes, Route, Link } from 'react-router-dom'


const Admin = ({ admin }) => { 

  const padding = {
    padding: 5
  }
    
  return (
    <div>
      <div>
        <Link style={padding} to='/admin/viestit'>Viestit</Link>
        <Link style={padding} to='/admin/rukous'>Rukouspyynnöt</Link>
        <Link style={padding} to='/admin/kirjautumishistoria'>Kirjautumishistoria</Link>
        
      </div>

      <Routes>
        <Route path='/viestit' element={<Messages admin={admin} />} />
        <Route path='/rukous' element={<Prayers admin={admin} />} />
        <Route path='/kirjautumishistoria' element={<LoginRecords admin={admin} />} />
      </Routes>
    </div>
  )
}

export default Admin