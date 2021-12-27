
import axios from 'axios';
import { TruckData } from '../types';

// const base_url="http://localhost:61924/api/"
const base_url=`http://norweb.magna.global/new_api/api/`
 
const GetShippingData = async (dateIn:Date,who:string = ""):Promise<TruckData>=>{
const url=`${base_url}GetTruckData?dateIn=${dateIn.toISOString()}`;

    return await axios.get(url )
        .then(o=> o.data)
 ;


// debugger;
//     const response = await fetch(url )
//     .then(o=>o.json())
//     .then(o=>{
//         debugger;
//         return o;
//     }) .catch(err=>{
//         debugger;
//     })

//     return response; 

}
export default GetShippingData;