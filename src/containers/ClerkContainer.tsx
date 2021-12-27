import React,{useState,useEffect} from 'react';
 import { GetShippingData } from '../api';

import ClerkComponent from '../components/ClerkComponent';
import { TruckData } from '../types';

const baseData = {
    TruckDatas:[],
    SendTos:[],
    Dispositions:[]
}
const ClerkContainer = () => {
    const [truckData,setTruckData] = useState<TruckData>(baseData)

    useEffect(()=>{
        const getData = async () => {

           const date = new Date();
            const response = await GetShippingData(date);
            setTruckData(response);
        }

        getData();
    },[])


    return (<ClerkComponent data={truckData}/>)
}

export default ClerkContainer;