import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    filter: 'all',
    moviesToDisplay: [],
    searchBarActive: false,
    searchTerm: ''
}

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        resetFilter: (state) => {
            state.filter = 'all'
        } ,
        setMoviesToDisplay: (state, action) => {
            state.moviesToDisplay = action.payload
        },
        setSearchBarActive: (state, action) => {
            state.searchBarActive = action.payload
        },
        setSearchTerm: (state, action) =>{
            state.searchTerm = action.payload
        }
    }
})

export const {setFilter, resetFilter, setMoviesToDisplay, setSearchBarActive, setSearchTerm} = generalSlice.actions
export default generalSlice.reducer