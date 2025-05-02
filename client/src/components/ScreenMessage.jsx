const ScreenMessage = ( {text} ) => {
    if (!text) return null
    
    return (
        <p className="screenMessage">{text}</p>
    )
}

export default ScreenMessage
