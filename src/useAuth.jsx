/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, {
    useState, useContext, createContext, useEffect,
  } from 'react';
  import {FacebookLoginClient} from '@greatsumini/react-facebook-login';

  // eslint-disable-next-line camelcase

  import jwt_decode from 'jwt-decode';
  import {callSignIn, callCheckAuth} from './api/api';
  
  const authContext = createContext();
  

  export const useAuth = () => useContext(authContext);
  
  // provider hook that creates auth object and handles state
  function useProvideAuth() {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [jwt, setJWT] = useState('');
  
    const [errorMessage, setErrorMessage] = useState('');
    const [errorModel, setErrorModel] = useState(false);
  
    const checkAuth = async () => {
      callCheckAuth().then(() => {
        setUser(true);
        setLoading(false);
      }).catch(() => {
        setUser(false);
        setLoading(false);
      });
    };
  
    useEffect(() => {
      checkAuth();
    }, []);
  
    const signin = async (accessToken) => {
      callSignIn(accessToken).then((res) => {
        localStorage.setItem('jwt-fe', res.data.token);
        setJWT(res.data.token);
        setUser(true);
      }).catch(() => {
      });
    };
  
    const signout = () => {
      FacebookLoginClient.logout(() => {
        localStorage.removeItem('jwt-fe');
        setUser(false);
        setJWT('');
      });
    };
  
    const jwtPayload = () => {
      if (localStorage.getItem('jwt-fe')) {
        return jwt_decode(localStorage.getItem('jwt-fe'))._id;
      }
      return '';
    };
  
    // return user object and auth methods
    return {
      user,
      loading,
      jwt,
      signin,
      signout,
      checkAuth,
      jwtPayload,
      setErrorMessage,
      errorMessage,
      errorModel,
      setErrorModel,
    };
  }
  

  export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
  }