import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/loginattempts'

const loginAttempt = async loginInformation => {
    const response = await axios.post(baseUrl, loginInformation)
    return response.data
}

export default { loginAttempt }
