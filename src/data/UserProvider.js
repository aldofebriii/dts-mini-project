import { useReducer } from 'react';
import UserContext from './user-context';
import { googleLogout } from '@react-oauth/google';

const defaultUserState = {
    isLoggedIn: false,
    via: 'google' || 'email',
};

const userReducer = (state, action) => {
    if(action.type === 'LOGIN'){
        return {
            isLoggedIn: true,
            via: action.via
        }
    };

    if(action.type === 'LOGOUT'){
        if(state.via === 'google'){
            googleLogout();
        };
        return {
            isLoggedIn: false,
            via: action.via
        }
    };
}

const UserProvider = (props) => {
    const [auth, dispatchUser] = useReducer(userReducer, defaultUserState);
    const userLoginHandler = (via) => {
        dispatchUser({type: "LOGIN", via: via});
    };

    const userLogoutHandler = (via) =>{
        dispatchUser({type: "LOGOUT", via: via})
    };

    return <UserContext.Provider value={{
        isLoggedIn: auth.isLoggedIn,
        via: auth.via,
        userLogin: userLoginHandler,
        userLogout: userLogoutHandler
    }}>
        {props.children}
    </UserContext.Provider>
};

export default UserProvider;