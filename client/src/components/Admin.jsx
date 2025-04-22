const Admin = ({ messages }) => {
    return (
        <>
            {messages.map(message =>
            <p key={message.id}>
                {message.timestamp.slice(0,10)} klo {message.timestamp.slice(11,19)} <br/>
                Nimi: {message.name}<br/>
                Viesti: {message.content}<br/>
                Puhelin: {message.phonenumber}<br/>
                Sähköposti: {message.email}<br/>
            </p>
            
            )}
        </>

    )
}

export default Admin