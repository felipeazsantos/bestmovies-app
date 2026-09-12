import Search from "./components/Search.jsx";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
import TrendingMovies from "./components/TrendingMovies.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

    const [movieList, setMovieList] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoadingTrendingMovies, setIsLoadingTrendingMovies] = useState(false);
    const [errorLoadingTrendingMovies, setErrorLoadingTredingMovies] = useState('');

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm])

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const endpoint = query
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/discover/movie?sort_by=popularity`;

            const response = await fetch(endpoint, API_OPTIONS);
            if(!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();
            if (data.Response === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
            }

            setMovieList(data.results || []);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            };
        } catch (error) {
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    const loadTredingMovies = async () => {
        setIsLoadingTrendingMovies(true);
        setErrorLoadingTredingMovies('');
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        } catch (error) {
            console.error(`Error fetching trending movies: ${error}`)
            setErrorLoadingTredingMovies(`Error fetching Trending Movies. Please try restart the page.`)
        } finally {
            setIsLoadingTrendingMovies(false);
        }
    }

    useEffect( () => {
        fetchMovies(debounceSearchTerm);
    }, [debounceSearchTerm]);

    useEffect(() => {
        loadTredingMovies();
    }, []);

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src="/hero.png" alt="" />
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                {isLoadingTrendingMovies ? (
                    <Spinner />
                ) : errorLoadingTrendingMovies ? (
                    <p className="text-red-500">{errorLoadingTrendingMovies}</p>
                ) :
                    trendingMovies.length > 0 && (
                        <TrendingMovies trendingMovies={trendingMovies} />
                    )
                }

                <section className="all-movies">
                    <h2>All Movies</h2>

                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    )
}
export default App
