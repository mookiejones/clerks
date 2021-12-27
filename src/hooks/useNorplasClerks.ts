import { useState } from 'react';


type DriverProp ={
    loadId:string,
    trailer: string,
    driverName:string
}

export const useNorplasClerks = () => {

    const [driver,setDriver] = useState<DriverProp>();


    const registerTruck = (loadId:string,trailer:string,driverName:string)=>{
        debugger;

    }

    return {registerTruck,driver}
}