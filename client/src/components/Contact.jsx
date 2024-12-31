const Contact = ( {newName, handleNameChange,
    newPhoneNumber, handlePhoneNumberChange,
    newEmail, handleEmailChange,
    newContent, handleContentChange,
    sendMessage }) => {
    
    return (
        <div>
            <h2>Ota yhteyttä</h2>
            <form onSubmit={sendMessage}>
                Nimi: <input
                    value={newName}
                    onChange={handleNameChange}/><br></br>
                Puhelinnumero: <input
                    value={newPhoneNumber}
                    onChange={handlePhoneNumberChange}/><br></br>
                Sähköposti: <input
                    value={newEmail}
                    onChange={handleEmailChange}/><br></br>
                Viesti: <input
                    value={newContent}
                    onChange={handleContentChange}/><br></br>
                <button type='submit'>Lähetä</button>

            </form>
        </div>

    )
}

export default Contact