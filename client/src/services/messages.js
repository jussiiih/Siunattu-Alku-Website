import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/messages'

const getAllMessages = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const createMessage = (newMessage) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}


export default { getAllMessages, createMessage }

