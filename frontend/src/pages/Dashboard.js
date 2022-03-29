import { useEffect} from "react";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../features/movies/moviesSlice";
import { reset } from "../features/movies/moviesSlice";
import { useNavigate } from "react-router-dom";
import MovieTile from "../components/MovieTile";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { moviesToDisplay, searchTerm } = useSelector((state) => state.general);
  const { filter } = useSelector((state) => state.general);
  const { searchBarActive } = useSelector((state) => state.general);
  
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    dispatch(getMovies());

    return () => {
      dispatch(reset());
    };

  }, [navigate, dispatch]);

  
  return (
    <div className="body-container">
      <Sidebar />
      <main>
          <SearchBar />
            {searchBarActive && (
              <div className="search-results dashboard">
                <h2 className="heading-lg dashboard__subheading">Found {moviesToDisplay.length} results for '{searchTerm}'</h2>
                  <ul className="dashboard__items">
                  {moviesToDisplay.map((movie, index) => {
                    return <MovieTile key={index} movie={movie} />
                  })}
                  </ul>
              </div>
            )}

            {/* Display all movies and TV series */}
            <section className="dashboard">
              {!searchBarActive && filter === 'all' && (
              <> 
              <h2 className="heading-lg dashboard__subheading">Trending</h2>
              <ul className="dashboard__items dashboard__items--trending">
                {moviesToDisplay.length !== 0 ? moviesToDisplay.map((movie, index) => {
                  return movie.isTrending &&
                    <MovieTile key={index} movie={movie} />
                }
                )
                : 
                <p>No Results</p>
                }
              </ul>
              <h2 className="heading-lg dashboard__subheading">Recomended for You</h2>
              <ul className="dashboard__items">
                {moviesToDisplay.length !== 0 ? moviesToDisplay.map((movie, index) => {
                  return !movie.isTrending &&
                    <MovieTile key={index} movie={movie} />
                }
                )
                : 
                <p>No Results</p>
                }
              </ul>
              </>
              )}

              {/* Display all movies */}
              {!searchBarActive && filter === 'movies' && (
              <> 
                <h2 className="heading-lg dashboard__subheading">Movies</h2>
                <ul className="dashboard__items">
                  {moviesToDisplay.length !== 0 ? moviesToDisplay.map((movie, index) => {
                    return movie.category === 'Movie' &&
                      <MovieTile key={index} movie={movie} />
                    })
                    : <p>No Results</p>
                  }
                </ul>
              </>
              )}

              {/* Display all tv series */}
              {!searchBarActive && filter === 'tv' && (
              <> 
                <h2 className="heading-lg dashboard__subheading">TV Series</h2>
                <ul className="dashboard__items">
                  {moviesToDisplay.length !== 0 ? moviesToDisplay.map((movie, index) => {
                    return movie.category === 'TV Series' &&
                      <MovieTile key={index} movie={movie} />
                    })
                    : <p>No Results</p>
                  }
                </ul>
              </>
              )}
                
              {/* Display all bookmarks */}
              {!searchBarActive && filter === 'bookmarks' && (
              <>
              <h2 className="heading-lg dashboard__subheading">Bookmarked Movies</h2>
                <ul className="dashboard__items">
                  {moviesToDisplay.length !== 0 ? moviesToDisplay.map((movie, index) => {
                    return movie.category === 'Movie' &&
                    <MovieTile key={index} movie={movie} />
                  }
                  )
                  : 
                    <p>You have not bookmarked anything yet</p>
                  }
                </ul>

              <h2 className="heading-lg dashboard__subheading">Bookmarked TV Series</h2>
                  <ul className="dashboard__items">
                    {moviesToDisplay.length !== 0 ? moviesToDisplay.map((movie, index) => {
                      return movie.category === 'TV Series' &&
                      <MovieTile key={index} movie={movie} />
                    }
                    )
                    : 
                      <p>You have not bookmarked anything yet</p>
                    }
                  </ul>
              </>  
              )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
