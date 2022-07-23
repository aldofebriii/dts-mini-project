import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import UserContext from "../../data/user-context";

const pilihanMenu = [{
    title: 'Movies',
    path: '/movies'
}, {
    title: 'Profile',
    path: '/profile'
}];


export default function NavigationHeader() {
    const ctx = useContext(UserContext);
    const qryRef = useRef();
    const navigation = useNavigate();
    const formSearchHandler = (e) => {
        if(e.keyCode === 13){
            const qryValue = qryRef.current.value;
            if(!qryValue.trim()){
                navigation('/movies')
            };
            navigation(`/search-movie?q=${qryValue}`);
        };
    };

    const logoutClickHandler = (e) => {
        e.preventDefault();
        ctx.userLogout();
        navigation('/', {replace: true})
    };
    return (
    <header>
    <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
            <div className="flex justify-start lg:w-0 lg:flex-1">
                <NavLink to="/" className="grid">
                    <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                    />
                </NavLink>
            </div>
            <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
                <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                {ctx.isLoggedIn && pilihanMenu.map((menu) => {
                    return (
                        <li key={menu.title} className="nav-item">
                            <NavLink className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" to={menu.path} data-mdb-ripple="true" data-mdb-ripple-color="light">{menu.title}</NavLink>
                        </li>
                    )
                })}
                {ctx.isLoggedIn && <li className="nav-item">
                    <a href="/" onClick={logoutClickHandler} className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" to='/logout' data-mdb-ripple="true" data-mdb-ripple-color="light">Logout</a>
                </li>}
                </ul>
            </div>
            {ctx.isLoggedIn && (
            <div>   
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input onKeyDown={formSearchHandler} ref={qryRef} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-dark-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Movie..." required="" />
                </div>
            </div>)}
            {!ctx.isLoggedIn && (
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <NavLink to="sign-in" className="nav-item whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                        Sign in
                    </NavLink>
                    <NavLink to="sign-up" className="nav-item ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Sign up
                    </NavLink>
                </div>
            )}
        </div>
    </nav>
    </header>
  );
}
