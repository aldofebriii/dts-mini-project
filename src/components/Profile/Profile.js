import Movie from "../Movie/Movie";
import myAva from '../../assets/img/ava.jpg'
import useHttp from "../../hooks/use-http";
import { useState, useEffect } from 'react';

const Profile = () => {
    const [sendRequest] = useHttp();
    const [user, setUser] = useState({});
    const [favoritMovie, setFavoritMovie] = useState([])

    useEffect(() => {
        //Do some http request
    sendRequest('https://api.themoviedb.org/3/account?api_key=b6161926b2f2c3df7e474d7d0a1a1b27&session_id=2bc9620eeff9123fe654e6e9a799aed6bb597690', {}, (rawData) => {
        const userData = rawData;
        setUser(userData);
    }, [sendRequest]);

    sendRequest('https://api.themoviedb.org/3/account/13348841/favorite/movies?api_key=b6161926b2f2c3df7e474d7d0a1a1b27&session_id=2bc9620eeff9123fe654e6e9a799aed6bb597690&language=en-US&sort_by=created_at.asc&page=1', {}, (rawData) => {
        const movieData = rawData?.results;
        setFavoritMovie(movieData);
    })
    }, [sendRequest]); 


     return (
        <main className="profile-page">
            <section className="relative block" style={{ height: "250px" }}>
            <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                style={{ height: "70px" }}
            >
                <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
                >
                <polygon
                    className="text-gray-300 fill-current"
                    points="2560 0 2560 100 0 100"
                ></polygon>
                </svg>
            </div>
            </section>
            <section className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="flex flex-wrap justify-center">
                <div className="w-1/5 sm:w-1/5 px-1">
                    <img src={myAva} alt="..." className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                </div>
                </div>
                <div className="px-6">
                    <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                        {user.name}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                        {user.username}
                    </div>
                    <div className="mb-2 text-gray-700 mt-10">
                        <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                        Member Since 2022
                    </div>
                    <div className="mb-2 text-gray-700">
                        <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                        Premium
                    </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Favourite Movie</h2>
                                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                    {favoritMovie.map(movie => {
                                        return <Movie key={movie.id} id={movie.id} title={movie.title} imageSrc={movie.poster_path} imageAlt={movie.backdrop_path} caption={movie.overview} voteAverage={movie.vote_average.toFixed(1)} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </main>
    )
};

export default Profile