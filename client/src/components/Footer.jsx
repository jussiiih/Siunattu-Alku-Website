const Footer = () => {
    return (
        <footer>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Web Design: Juha-Pekka Heino</span>
                <a href="https://www.linkedin.com/in/juha-pekka-heino-b15b63303">
                    <img 
                        src="/images/InBug-White.png" 
                        alt="LinkedIn Logo, link to LinkedIn page"
                        height={30}
                        width={30}
                    />
                </a>
            </div>
        </footer>
    )
}


export default Footer