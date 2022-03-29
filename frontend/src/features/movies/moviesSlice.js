import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import moviesService from './moviesService'

const initialState = {
    movies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Get movies
export const getMovies = createAsyncThunk('movies/getMovies', async (_, thunkAPI) => {
    try {
        return await moviesService.getMovies();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Bookmark movie

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        reset: (state) => initialState
    }, extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.movies = action.payload
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = moviesSlice.actions
export default moviesSlice.reducer