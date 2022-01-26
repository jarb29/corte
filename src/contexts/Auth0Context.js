import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Auth0Client } from '@auth0/auth0-spa-js';

// import auth0 from 'auth0-js';
//
import { auth0Config } from '../config';

// ----------------------------------------------------------------------

let auth0Client = null;

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, token } = action.payload;
    return { ...state, isAuthenticated, isInitialized: true, user, token };
  },
  LOGIN: (state, action) => {
    const { user, token } = action.payload;
    return { ...state, isAuthenticated: true, user, token };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null
  })
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'auth0',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        auth0Client = new Auth0Client({
          client_id: auth0Config.clientId,
          domain: auth0Config.domain,
          redirect_uri: window.location.origin
        });

        await auth0Client.checkSession();

        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const user = await auth0Client.getUser();
          // const user = await auth0Client.getIdTokenClaims();
          let token = await auth0Client.getIdTokenClaims();
          token = token.__raw;

          dispatch({
            type: 'INITIALIZE',
            payload: { isAuthenticated, user, token }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: { isAuthenticated, user: null, token: null }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: { isAuthenticated: false, user: null, token: null }
        });
      }
    };

    initialize();
  }, [dispatch]);

  const login = async () => {
    await auth0Client.loginWithPopup();
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client.getUser();
      // console.log(user, 'JJJJJJJJJJJ');
      // const token = await auth0Client.getTokenSilently();
      let token = await auth0Client.getIdTokenClaims();
      token = token.__raw;
      console.log(user, 'IIIII');
      dispatch({ type: 'LOGIN', payload: { user, token } });
    }
  };

  const logout = () => {
    auth0Client.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'auth0',
        user: {
          id: state?.user?.sub,
          photoURL: state?.user?.picture,
          email: state?.user?.email,
          displayName: state?.user?.name,
          role: 'admin'
        },
        login,
        logout,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
