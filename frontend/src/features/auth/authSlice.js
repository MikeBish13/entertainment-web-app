import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    // If there is no user in localstorage then set initial state to null, otherwise set state to user in localstorage
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


// Register the user
// 1. 'user' data is received from the register form in the Register component
// 2. The 'user' data is sent to a function called 'register' in the authService file where it is used to make an api call
// 3. Any possible errors are then handled
export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Login the user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
     await authService.logout()
})

//Update user bookmarks
export const updateBookmarks = createAsyncThunk('auth/updateBookmarks', async (data, thunkAPI) => {
    try {
        return await authService.updateBookmarks(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    // The reducer updates state based on the progress of the API call 
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(updateBookmarks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateBookmarks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateBookmarks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer