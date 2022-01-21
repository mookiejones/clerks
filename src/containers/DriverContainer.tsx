import React from 'react';
import { useSignIn } from '../hooks/useSignIn';

import SignInComponent from '../components/SignInComponent';
import {SignInComponentProps} from '../types'
const DriverContainer = () => {

    const {
        notValid,
        user ,
        loggedIn,
        handleChangeLoad,
        handleChangeTrailer,
        handleChangeDriverName,
        handleLogin
       } = useSignIn();

       const props = {
        notValid,
        user ,
        loggedIn,
        handleChangeLoad,
        handleChangeTrailer,
        handleChangeDriverName,
        handleLogin
      
       };
    return (<SignInComponent {...props} />)
}

export default DriverContainer;