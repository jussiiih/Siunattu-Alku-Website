import { useState } from "react"
import LoginForm from "./LoginForm"
import AdminView from "./AdminView"

const Admin = () => { 
  const [admin, setAdmin] = useState(null)
  return (
    <>
      {!admin && <LoginForm setAdmin={setAdmin} />}
      {admin && <AdminView admin={admin} />}
    </>
  )
}

export default Admin