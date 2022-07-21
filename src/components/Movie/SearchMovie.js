import useHttp from "../../hooks/use-http";
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import Movie from "./Movie";
const SearchMovie = () => {
    const [searchedMovie, setSearchedMovie] = useState([]);
    const navigation = useNavigate();
    const [sendRequest, isLoading, isError] = useHttp();
    const [searchParams] = useSearchParams();
    let q = searchParams.get('q');


    useEffect(() => {
        if(!q){
            navigation('/movies');
        } else {
            sendRequest(`https://api.themoviedb.org/3/search/movie?api_key=b6161926b2f2c3df7e474d7d0a1a1b27&language=en-US&query=${q}&page=1&include_adult=false`, {}, (rawData) => {
                const moviesData = rawData?.results;
                setSearchedMovie(moviesData)
            });
        }
    }, [sendRequest, q, navigation])

    const validContent = <>
        {isError && <p>Error..</p>}
        {isLoading && <p>Loading...</p>}
        {searchedMovie.length === 0 && !isLoading && <p>No Movie Found...</p>}
        {searchedMovie.length > 0 && searchedMovie.map(movie => {
            return <Movie key={movie.id} id={movie.id} title={movie.title} imageSrc={movie.poster_path} imageAlt={movie.backdrop_path} caption={movie.overview} voteAverage={movie.vote_average.toFixed(1)} />
        })}
    </>;

    const invalidContent = <p>Invalid Search!</p>

    return <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{`Result For "${q}"`}</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {q && validContent};
            {!q && invalidContent}
        </div>
        </div>
    </div>
};

export default SearchMovie;