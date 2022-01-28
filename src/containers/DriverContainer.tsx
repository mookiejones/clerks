import React from 'react';
import { useSignIn } from '../hooks/useSignIn';

import SignInComponent from '../components/SignInComponent';
import {SignInProps} from '../types'
const DriverContainer = () => {

    
    const {
        onClick,
        isLoggedIn       
       } = useSignIn();


     
       const props:SignInProps = {
        isLoggedIn,
        onClick 
      
       };
    return (<SignInComponent {...props} />)
}

export default DriverContainer;