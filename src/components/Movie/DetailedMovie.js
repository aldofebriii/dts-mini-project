import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';

const DetailedMovie = () => {
    const params = useParams();
    const [sendRequest] = useHttp();
    const { movieId } = params;
    const [loadedMovie, setLoadedMovie] = useState({});

    useEffect(() => {
    //Do some http request
        sendRequest(`https://api.themoviedb.org/3/movie/${movieId}?api_key=b6161926b2f2c3df7e474d7d0a1a1b27&language=en-US`, {}, (rawData) => {
            const movieData = rawData;
            setLoadedMovie(movieData);
        });
    }, [sendRequest, movieId]); 

    return <div className="group relative">
        <div className="justify-center p-20">
            <div className="rounded-lg shadow-lg bg-white">
                <div className='h-80'>
                    <iframe className='w-full h-full' src="https://www.youtube.com/embed/FvOpPeKSf_4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{loadedMovie.title}</h5>
                    <p className="text-gray-700 text-base mb-4">
                        {loadedMovie.overview}
                    </p>
                    <p className="text-gray-700 text-base mb-4">
                        Popularity : {loadedMovie.popularity}
                    </p>
                    <p className="text-gray-700 text-base mb-4">
                        Release Date : {loadedMovie.release_date}
                    </p>
                </div>
            </div>
        </div>
    </div>
};

export default DetailedMovie;