import React from 'react'
import{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setMoviesToDisplay, setSearchBarActive, setSearchTerm } from "../features/general/generalSlice"

function SearchBar() {
    const dispatch = useDispatch()
    const {filter, searchTerm} = useSelector((state) => state.general)
    const {movies} = useSelector((state) => state.movies)
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
      startSearch(searchTerm)
    }, [searchTerm])
    
    const startSearch = (searchTerm) => {
        if(searchTerm.length !== 0) {
          dispatch(setSearchBarActive(true))
        } else {
          dispatch(setSearchBarActive(false))
        }

        let filteredList = []
        filteredList = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
        if(filter === 'all') {
            dispatch(setMoviesToDisplay(filteredList))
          }
          if(filter === 'movies') {
            dispatch(setMoviesToDisplay(filteredList.filter((movie) => movie.category === 'Movie')))
          } 
          if(filter === 'tv') {
            dispatch(setMoviesToDisplay(filteredList.filter((movie) => movie.category === 'TV Series')))
          }
          if(filter === 'bookmarks') {
            let bookmarkedMovies = []
            filteredList.forEach((movie) => {
              user.bookmarks.forEach((bookmarkedMovie) => {
                if(movie._id === bookmarkedMovie) {
                  bookmarkedMovies.push(movie)
                }
              })
            })
            dispatch(setMoviesToDisplay(bookmarkedMovies))
          }
    }

    

  return (
    <div className="search">
        <svg className="search__icon" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#FFF"/></svg>
        <input
        className="search__input"
        onInput={(e) => dispatch(setSearchTerm(e.target.value))} 
        type="search" 
        placeholder={filter === 'all' ? 'Search for movies or TV series'
        : filter === 'movies' ? 'Search for movies'
        : filter === 'tv' ? 'Search for TV series'
        : filter === 'bookmarks' ? 'Search for bookmarked shows'
        : ''
        }>
          
        </input>
        
    </div>
  )
}

export default SearchBar