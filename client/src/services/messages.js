import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/messages'

const getAllMessages = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createMessage = (newMessage) => {
  const request = axios.post(baseUrl, newMessage)
  return request.then(response => response.data)
}

const deleteMessage = (messageToBeRemoved) => {
  return axios.delete(`${baseUrl}/${messageToBeRemoved.id}`)
}

export default { getAllMessages, createMessage, deleteMessage }

