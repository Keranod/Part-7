import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getCountry = async (name) => {
    const response = await axios.get(`${baseUrl}/api/name/${name}`)
    return response
}

export default { getCountry }