import { useState,useEffect  } from 'react'; 
import { TruckDataType, ClerkDataType,Row } from '../types'
const testData:ClerkDataType = require('../api/testData.json');

export const useData = () => {

    const [data,setData] = useState(testData);

    useEffect(()=>{

       

        const newData = testData;
        newData.TruckDatas = testData.TruckDatas.map((o:TruckDataType)=>({
            ...o,
                    asn:o.asn==='0'?'Yes':'No',
                    hourMinute:`${o.hour}:${o.minute}`
        }))

       
       
        setData(newData);


    },[]);


    return ( {
        data:data
    })

}