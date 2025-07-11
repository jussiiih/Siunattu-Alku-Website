import axios from 'axios'
const baseUrl = '/api/prayers'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAllPrayers = () => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const createPrayer = (newPrayer) => {
    const request = axios.post(baseUrl, newPrayer)
    return request.then(response => response.data)
}

const deletePrayer = (prayerToBeRemoved) => {
    return axios.delete(`${baseUrl}/${prayerToBeRemoved.id}`)
}

const changeSeenAttribute = async (prayer) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.put(`${baseUrl}/${prayer.id}`, {}, config)
    return response.data
}

export default { getAllPrayers, createPrayer, deletePrayer, changeSeenAttribute, setToken }

