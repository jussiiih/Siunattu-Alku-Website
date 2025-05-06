const Footer = () => {
    return (
        <footer>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{fontSize: 30}}>Siunattu Alku</span>
                <a href="https://www.instagram.com/siunattualku/">
                    <img 
                        src="/images/Instagram_Glyph_White.png" 
                        alt="Instagram-logo, linkki Instagram-profiiliin"
                        height={30}
                        width={30}
                    />
                </a>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', fontSize: 12 }}>
                <span>Web Design by Juha-Pekka Heino</span>
                <a href="https://www.linkedin.com/in/juha-pekka-heino-b15b63303">
                    <img 
                        src="/images/InBug-White.png" 
                        alt="LinkedIn-logo, linkki LinkedIn-sivulle"
                        height={15}
                        width={15}
                    />
                </a>
            </div>
        </footer>
    )
}


export default Footer