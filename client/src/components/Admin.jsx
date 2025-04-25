const Admin = ({ messages, deleteMessage, handleLogin, username, setUsername, password, setPassword, admin, setAdmin }) => {
    const loginForm = () => {
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
    )}

    const messageList = () => {
        return (
        messages.map(message =>
            <div key={message.id}>
            <p>
                {message.timestamp}<br/>
                Nimi: {message.name}<br/>
                Viesti: {message.content}<br/>
                Puhelin: {message.phoneNumber}<br/>
                Sähköposti: {message.email}<br/>
            </p>
            <button onClick={() => deleteMessage(message)}>
                Poista viesti
            </button>
            </div>
            )
        )
    }
    
    return (
        <>
            { !admin && loginForm() }
            { admin && messageList() }
        </>

    )
}

export default Admin