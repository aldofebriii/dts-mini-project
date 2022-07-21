import { useState, useEffect } from "react";
import Movie from './Movie';
import useHttp from "../../hooks/use-http";


const FeaturedMovie = () => {
    const [tampilMovie, setTampilMovie] = useState([]);
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [sendRequest, isLoading, isError ] = useHttp();

    useEffect(() => {
        //Do some http request
    sendRequest('https://api.themoviedb.org/3/trending/movie/day?api_key=b6161926b2f2c3df7e474d7d0a1a1b27', {}, (rawData) => {
            const movieData = rawData?.results;
            setFeaturedMovies(movieData);
        });
    }, [sendRequest]); 
    
    useEffect(() => {
        if(featuredMovies.length > 0){
            //Change every 10 second
            let strIdx = 0;
            let finishIdx = strIdx + 4;
            let moviesLength = featuredMovies.length;
            let loadedMovies = featuredMovies.slice(strIdx, finishIdx);
            setTampilMovie(loadedMovies);
            strIdx += 4;
            finishIdx += 4;
            setInterval(() => {
                if(finishIdx === moviesLength){
                    strIdx = 0;
                    finishIdx = strIdx + 4;
                };
                loadedMovies = featuredMovies.slice(strIdx, finishIdx);
                setTampilMovie(loadedMovies);
                strIdx += 4;
                finishIdx += 4;
            }, 10000)
        }
    }, [featuredMovies])

    return (
        <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Trending</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {isError && <p>Error..</p>}
            {isLoading && <p>Loading...</p>}
            {featuredMovies.length === 0 && <p>No Movie Available...</p>}
            {featuredMovies.length > 0 && tampilMovie.map(movie => {
                return <Movie key={movie.id} id={movie.id} title={movie.title} imageSrc={movie.poster_path} imageAlt={movie.backdrop_path} caption={movie.overview} voteAverage={movie.vote_average.toFixed(1)} />
            })}
          </div>
        </div>
      </div>
    )
};

export default FeaturedMovie;