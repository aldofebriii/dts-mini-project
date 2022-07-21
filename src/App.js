import './App.css';
import Nav from './components/UI/Nav';
import FeaturedMovie from './components/Movie/FeaturedMovie';
import Movies from './components/Movie/Movies';
import Footer from './components/UI/Footer';
import Profile from './components/Profile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom'
import DetailedMovie from './components/Movie/DetailedMovie';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Register';
import { GoogleOAuthProvider} from '@react-oauth/google';
import { useContext } from "react";
import UserContext from "./data/user-context";
import SearchMovie from './components/Movie/SearchMovie';

function App() {
  const ctx = useContext(UserContext);
  const loginComp = <GoogleOAuthProvider clientId='828262859736-sqobasl8165s7erkp8vrn5ae2j0g8vf4.apps.googleusercontent.com'> <Login /> </GoogleOAuthProvider>
  const loggedUserRoute = <>
    <Route path="/search-movie" element={<SearchMovie />} />
    <Route path="/movies/:movieId" element={ <DetailedMovie />} />
    <Route path='/movies' element={[<FeaturedMovie/>, <Movies />]} />
    <Route path="/profile" element={<Profile />} />
  </>;

  const notLoggedUserRoute = <>
    <Route path="/sign-in" element={loginComp}/>
    <Route path="/sign-up" element={<Signup />} />
  </>
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={ <Navigate to={ctx.isLoggedIn ? '/movies' : '/sign-in'} />} />
        {ctx.isLoggedIn && loggedUserRoute}
        {!ctx.isLoggedIn && notLoggedUserRoute}
        <Route path="*" element={<p>Page Not Found!</p>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
