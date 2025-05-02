import messageService from "../services/messages"
import loginService from "../services/login"
import { useState } from "react"

const LoginForm = ({ setAdmin }) => { 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const handleLogin = async (event) => {
      event.preventDefault()
      const user = await loginService.login({
        username,
        password,
      })
      messageService.setToken(user.token)
      loginService.setToken(user.token)
      setAdmin(user)
      setUsername('')
      setPassword('')

    }
   

    return (
        <form onSubmit={handleLogin}>
        <div>
            Käyttäjätunnus:
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
            Salasana:
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type="submit">OK</button>   
    </form>
    )
}

export default LoginForm