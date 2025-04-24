const Admin = ({ messages, deleteMessage }) => {
    return (
        <>
            {messages.map(message =>
            <div key={message.id}>
            <p>
                {message.timestamp}<br/>
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