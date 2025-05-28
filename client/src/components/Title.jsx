import { Link } from 'react-router-dom'

const Title = () => {
  return (
    <div className="title-container">
      <h1>
        <Link to="/" style={{ all: 'unset', cursor: 'pointer' }}>
          Siunattu alku
        </Link>
      </h1>
    </div>
  )
}

export default Title