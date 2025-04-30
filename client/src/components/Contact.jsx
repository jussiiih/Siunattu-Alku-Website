const Contact = ( {newMessageType, handleMessageTypeChange,
    newName, handleNameChange,
    newPhoneNumber, handlePhoneNumberChange,
    newEmail, handleEmailChange,
    newContent, handleContentChange,
    sendMessage }) => {
    
    return (
        <div>
            <h2>Ota yhteyttä</h2>
            <form onSubmit={sendMessage}>
                <input
                    type='radio'
                    id='yhteydenottopyynto'
                    name='messageType'
                    value='yhteydenottopyynto'
                    checked={newMessageType === 'yhteydenottopyynto'}
                    onChange={handleMessageTypeChange}
                />
            <label htmlFor='yhteydenottopyynto'>Yhteydenottopyyntö</label><br />

            <input
                type='radio'
                id='palaute'
                name='messageType'
                value='palaute'
                checked={newMessageType === 'palaute'}
                onChange={handleMessageTypeChange}
            />
            <label htmlFor='palaute'>Palaute</label><br />

            <input
                type='radio'
                id='muu'
                name='messageType'
                value='muu'
                checked={newMessageType === 'muu'}
                onChange={handleMessageTypeChange}
            />
            <label htmlFor='muu'>Muu</label><br />

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