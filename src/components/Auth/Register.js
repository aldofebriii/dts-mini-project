import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [err, setError] = useState(null);
    const [sendRequest, isLoading, isError] = useHttp();
    const navigation = useNavigate();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setError(null);
        const emailValue = emailRef.current?.value;
        const passwordValue = passwordRef.current?.value;

        const isValid = emailValue && passwordValue && emailValue.includes('@') && passwordValue.length > 6
        if(!isValid){
            setError({message: "Pastikan email dan password benar."})
        };

        sendRequest('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDF-CQDTijZSeAZBMLYz-KCA1eHLkqLPVs', {method: 'POST', body: JSON.stringify({email: emailValue, password: passwordValue})}, (rawData) => {
            navigation('/sign-in', {replace: true})
        });
    };

    if(isError){
        setError("Failed on Login Request")
    };

    return <>
    <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample"
                />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <form onSubmit={formSubmitHandler}>
                {err && (<div className="flex flex-row rounded-md items-center justify-center lg:justify-start bg-red-800 mb-2">
                    <h2 className="mb-1 p-3 text-white">{err.message}</h2>
                </div>)}
                <div className="flex flex-row items-center justify-center lg:justify-start">
                    <h2 className="mr-4">Daftar Akun</h2>
                </div>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                </div>
                <div className="mb-6">
                    <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="userEmail"
                    placeholder="Email address"
                    ref={emailRef}
                    />
                </div>
                <div className="mb-6">
                    <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="userPassword"
                    placeholder="Password"
                    ref={passwordRef}
                    />
                </div>
                <div className="text-center lg:text-left">
                    <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                    Sign Up
                    </button>
                    {isLoading && <p>Loading...</p>}
                </div>
                </form>
            </div>
            </div>
        </div>
    </section>
    </>
};

export default Signup;