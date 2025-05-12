import axios from 'axios'
const baseUrl = '/api/messages'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAllMessages = () => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const createMessage = (newMessage) => {
    const request = axios.post(baseUrl, newMessage)
    return request.then(response => response.data)
}

const deleteMessage = (messageToBeRemoved) => {
    return axios.delete(`${baseUrl}/${messageToBeRemoved.id}`)
}

const changeSeenAttribute = async (message) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.put(`${baseUrl}/${message.id}`, {}, config)
    return response.data
}

export default { getAllMessages, createMessage, deleteMessage, changeSeenAttribute, setToken }

