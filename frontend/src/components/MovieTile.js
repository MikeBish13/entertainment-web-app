import React from 'react'
import { updateBookmarks } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";


function MovieTile({movie}) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { filter, searchTerm } = useSelector((state) => state.general);

    const handleBookmarkClick = (movieID) => {
        let newBookmarks = []
        if(user.bookmarks.indexOf(movieID) === -1) {
          newBookmarks = [...user.bookmarks, movieID]
        } else {
          newBookmarks = user.bookmarks.filter((bookmark) => bookmark !== movieID)
        }
        dispatch(updateBookmarks({
          id: user._id,
          bookmarks: newBookmarks
        }))
      }

  return (
    <li className={movie.isTrending && filter === 'all' && searchTerm === ''  ? "dashboard__item dashboard__item--trending" : "dashboard__item"}>
      <div className="movie">
        <picture className="movie__image movie__image--reg">
          <source media="(max-width: 700px)" srcSet={movie.isTrending && filter === 'all' && searchTerm === '' ? movie.thumbnail.trending.small : movie.thumbnail.regular.small}/>
          <source media="(max-width: 1000px)" srcSet={movie.isTrending && filter === 'all' && searchTerm === ''  ? movie.thumbnail.trending.large : movie.thumbnail.regular.medium}/>
          <img src={movie.isTrending && filter === 'all' && searchTerm === '' ? movie.thumbnail.trending.large : movie.thumbnail.regular.large} alt={movie.title}></img>
          <div className="movie__hover">
            <div className="movie__play">
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z" fill="#FFF"/></svg>
            Play
            </div>  
          </div>
        </picture>
        <button 
        className={user && user.bookmarks.indexOf(movie._id) !== -1 ? 'btn--bookmark movie__bookmark movie__bookmark--selected' : 'btn--bookmark movie__bookmark'}
        onClick={() => {handleBookmarkClick(movie._id)}}
        >
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke="#FFF" stroke-width="1.5" fill="none"/></svg>
        </button>
        <div className="movie__details">
          <div className="movie__info">
            <p className="movie__year body-s">{movie.year}</p>
            <p>·</p>
            <p className="movie__category body-s">
              {movie.category === 'Movie' ? (<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z" fill="#FFF" opacity=".75"/></svg>)
              : (<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705 1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z" fill="#FFF" opacity=".75"/></svg>)
              }
              {movie.category}
            </p>
            <p>·</p>
            <p className="movie__rating body-s">{movie.rating}</p>
          </div>
          <p className="movie__title body-md">{movie.title}</p>
        </div>
      </div>
    </li> 
  )
}

export default MovieTile