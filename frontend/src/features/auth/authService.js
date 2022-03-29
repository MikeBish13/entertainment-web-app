// strictly for making HTTP requests
import axios from 'axios'

const API_URL = '/api/users'

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + '/login', userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data) )
    }
    return response.data
}

//Update bookmarks
const updateBookmarks = async (data) => {
    const response = await axios.put(API_URL + '/' + data.id, {bookmarks: data.bookmarks}, {
        new: true
    })
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data) )
    }
    return response.data
}

//Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login, 
    logout,
    updateBookmarks
}

export default authService