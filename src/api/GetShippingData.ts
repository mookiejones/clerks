
import axios from 'axios';
import { TruckData } from '../types';
const testData = require('./testData.json')
// const base_url="http://localhost:61924/api/"
const base_url=`http://norweb.magna.global/new_api/api/`
 
// Probably going to have to use new api
// http://norweb.testapi/clerks.asmx
const GetShippingData = async (dateIn:Date,who:string = ""):Promise<TruckData>=>{

const url=`${base_url}GetTruckData?dateIn=${dateIn.toISOString()}`;

    return await axios.get(url )
        .then(o=>testData)
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
