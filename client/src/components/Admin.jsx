const Admin = ({ messages, deleteMessage }) => {
    return (
        <>
            {messages.map(message =>
            <div key={message.id}>
            <p>
                {message.timestamp.slice(0,10)} klo {message.timestamp.slice(11,19)} <br/>
                Nimi: {message.name}<br/>
                Viesti: {message.content}<br/>
                Puhelin: {message.phonenumber}<br/>
                Sähköposti: {message.email}<br/>
            </p>
            <button onClick={() => deleteMessage(message)}>
                Poista viesti
            </button>
            </div>
            )}
        </>

    )
}

export default Admin