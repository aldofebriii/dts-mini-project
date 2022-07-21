import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import useHttp from "../../hooks/use-http";

const Movies = () => {
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadedMovies, setLoadedMovies] = useState([]);

    const [sendRequest, isLoading, isError ] = useHttp();
    const carousel = useRef(null);

    useEffect(() => {
        //Do some http request
    sendRequest('https://api.themoviedb.org/3/movie/now_playing?api_key=b6161926b2f2c3df7e474d7d0a1a1b27&language=en-US&page=1', {}, (rawData) => {
            const movieData = rawData?.results;
            setLoadedMovies(movieData);
        });
    }, [sendRequest]); 

    const movePrev = () => {
        if (currentIndex > 0) {
        setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const moveNext = () => {
        if (
            carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
        ) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const isDisabled = (direction) => {
        if (direction === 'prev') {
            return currentIndex <= 0;
        };
        if(direction === 'next' && currentIndex === 0 && carousel.current) {
            if(carousel.current.offsetWidth === maxScrollWidth.current){
                return true
            };
            return false;
        };
        if (direction === 'next' && currentIndex !== 0 && carousel.current) {
            return (
                carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
            );
        };
        return false;
    };
    
    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    
    useEffect(() => {
        maxScrollWidth.current = carousel.current
        ? carousel.current.scrollWidth - carousel.current.offsetWidth
        : 0;
    }, [loadedMovies]);

    return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Now Watching</h2>
        <div className="carousel my-12 mx-auto">
            <div className="relative overflow-hidden">
                <div className="flex justify-between absolute top left w-full h-full">
                <button
                    onClick={movePrev}
                    className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                    disabled={isDisabled('prev')}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-20 -ml-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                    </svg>
                    <span className="sr-only">Prev</span>
                </button>
                <button
                    onClick={moveNext}
                    className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                    disabled={isDisabled('next')}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-20 -ml-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                    </svg>
                    <span className="sr-only">Next</span>
                </button>
                </div>
                <div
                id="carousel-inspect"
                ref={carousel}
                className="carousel relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
                >
                {isLoading && <p>Loading..</p>}
                {isError && <p>Error...</p>}
                {loadedMovies.length === 0 && <p>No Movie Was Found</p>}
                {loadedMovies.length > 0 && loadedMovies.map((movie, index) => {
                    return (
                    <div
                        key={index}
                        className="carousel-item text-center relative w-64 h-64 snap-start"
                    >
                        <NavLink
                        to={`${movie.id}`}
                        className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path || ''})` }}
                        >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={"Images Failed To Load.."}
                            className="w-full aspect-square hidden"
                        />
                        </NavLink>
                        <NavLink
                         to={`${movie.id}`}
                        className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-indigo-800/75 z-10"
                        >
                        <h2 className="text-white py-6 px-3 mx-auto text-xl">
                            {movie.title.toUpperCase()}
                        </h2>
                        <p className="text-white mx-auto py-6 px-3">{movie.overview.slice(0, 100) + '...'}</p>
                        </NavLink>
                    </div>
                    );
                })}
                </div>
            </div>
        </div>
    </div>
    )
};

export default Movies