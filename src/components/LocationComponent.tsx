import {
    Autocomplete,
    TextField
} from '@mui/material'

import _ from 'lodash';
 
 

const LocationComponent = ({items, onChange}:{items:[],onChange:any}) =>{

    console.log(items);
    const  data= _.groupBy(items,'name');

 


    console.log(data)
    /**
     * Get the key names so we know the locations that we can select by
     */
    const options = Object.keys(data);


    return (<Autocomplete
            id='location-selector'
            options={options}
            getOptionLabel = {(o)=>o}
            onChange={onChange}
            renderInput={(params)=><TextField {...params} label='Select Location'   variant='outlined'
            />}
            />
        )
}

export default LocationComponent