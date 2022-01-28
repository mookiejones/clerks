import React,{useState,useEffect} from 'react';
 import { GetShippingData } from '../api';

import ClerkComponent from '../components/ClerkComponent';
import { TruckData } from '../types';
import TruckDataGrid from '../components/TruckDataGrid'
const testData = require(`../api/testData.json`)

const baseData = {
    TruckDatas:[],
    SendTos:[],
    Dispositions:[]
}
const ClerkContainer = () => {
    const [truckData,setTruckData] = useState<TruckData>(testData)

    useEffect(()=>{
        const getData = async () => {

           const date = new Date();
            const response = await GetShippingData(date);
         
            setTruckData(response);
        }

        getData();
    },[])
 
    return (<TruckDataGrid data={truckData}/>)
}

export default ClerkContainer;