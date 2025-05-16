import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getLoginRecords = () => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const deleteLoginRecord = (RecordToBeRemoved) => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.delete(`${baseUrl}/${RecordToBeRemoved.id}`, config)
}

const deleteAllLoginRecords = () => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.delete(`${baseUrl}/`, config)
}

export default { login, getLoginRecords, deleteLoginRecord, deleteAllLoginRecords, setToken }
