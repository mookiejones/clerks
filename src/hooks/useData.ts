import { useState,useEffect  } from 'react'; 
import { TruckDataType, ClerkDataType,Row } from '../types'
const testData:ClerkDataType = require('../api/testData.json');


function formatRow(o:TruckDataType):Row{
    return ({
        ...o,         
        asn:o.asn==='0'?'Yes':'No',
        hourMinute:`${o.hour}:${o.minute}`
    });
} 
export const useData = () => {

    const [data,setData] = useState(testData);

    useEffect(()=>{

       

     

        let newData:ClerkDataType = ({
            SendTos:testData.SendTos,
            SpecialInstructions:testData.SpecialInstructions,
            Dispositions:testData.Dispositions,
            TruckDatas:testData.TruckDatas.map(formatRow)
            
        })
      
 
       
        setData(newData);


    },[]);


    return ( {
        data:data
    })

}