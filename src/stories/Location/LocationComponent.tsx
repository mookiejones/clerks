import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import _ from 'lodash';


interface LocationComponentProps {
    items:[];
    onChange:(e:any,v:any)=>void
};


const LocationComponent = (props:LocationComponentProps) =>{
    // Group All of the truck Data
    const data = _.groupBy(props.items,'name');


      /**
     * Get the key names so we know the locations that we can select by
     */
       const options = Object.keys(data);


       return (<Autocomplete
        id='location-selector'
        options={options}
        getOptionLabel = {(o)=>o}
        onChange={props.onChange}
        renderInput={(params)=><TextField {...params} label='Select Location'   variant='outlined'
        />}
        />
    )
}

export default LocationComponent;