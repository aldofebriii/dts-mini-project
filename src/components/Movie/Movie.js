import { useNavigate } from 'react-router-dom';

const Movie = ({id, imageSrc, imageAlt, title, caption, voteAverage}) => {
    const navigate = useNavigate();
    //Click HAndler
    const movieClickHandler = (e) => {
        e.preventDefault();
        navigate(`/movies/${id}`)
    };

    return (
    <div key={id} className="group relative" onClick={movieClickHandler}>
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img
            src={'https://image.tmdb.org/t/p/w500' + imageSrc}
            alt={'https://image.tmdb.org/t/p/w500' + imageAlt}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
        </div>
        <div className="mt-4 flex justify-between">
            <div>
            <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className="absolute inset-0" />
                {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{caption.slice(0, 100) + '...'}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{voteAverage}</p>
        </div>
    </div>
    )
};

export default Movie;