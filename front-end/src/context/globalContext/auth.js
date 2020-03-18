import React, { createContext, useReducer } from 'react';
import * as actionTypes from '../actionTypes';
import jwtDecoder from 'jwt-decode';

const initialState = {
  user: null
};

if (localStorage.getItem('x-token')) {
  const decodedToken = jwtDecoder(localStorage.getItem('x-token'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('x-token');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {}
});

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        user: action.payload
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = userData => {
    localStorage.setItem('x-token', userData.token);

    dispatch({
      type: actionTypes.LOGIN_USER,
      payload: userData
    });
  };

  const logout = () => {
    localStorage.removeItem('x-token');

    dispatch({
      type: actionTypes.LOGOUT_USER
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout
      }}
      {...props}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
