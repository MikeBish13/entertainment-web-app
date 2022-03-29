import axios from 'axios'

const API_URL = '/api/movies'

//Get movies user
const getMovies = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

const moviesService = {
    getMovies
}

export default moviesService