import React  from 'react';
import ClerkContainer from './ClerkContainer';
import DriverContainer from './DriverContainer';

import {
    BrowserRouter,

    useLocation
  } from "react-router-dom";
 

  const Child = () => {
    const {pathname,search,hash} = useLocation();
    console.log(`location is ${pathname},search is ${search}, hash is ${hash}`);
 

    const Element= pathname==='/'
    ?DriverContainer
    :ClerkContainer

    return <Element/>
  }
  const RouteContainer = () => {

 

    const handleGetConfirmation = (message:string,callback:(ok:boolean)=>void) => {
        debugger;
    }
      return (
      <BrowserRouter 
        getUserConfirmation={handleGetConfirmation}>
            <Child/>
      </BrowserRouter>

  )}
  export default RouteContainer;