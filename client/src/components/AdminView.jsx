import Messages from "./Messages"
import { Routes, Route, Link } from 'react-router-dom'


const Admin = ({ admin }) => { 

  const padding = {
    padding: 5
  }
    
  return (
    <div>
      <div>
        <Link style={padding} to='/admin/viestit'>Viestit</Link>
      </div>

      <Routes>
        <Route path='/viestit' element={<Messages admin={admin} />} />
      </Routes>
    </div>
  )
}

export default Admin