import { 
    Autocomplete,
    TextField 
} from "@mui/material";
import _ from 'lodash'

const LocationComponent = ( props: any) =>{



    const data = _.groupBy(props.data.TruckDatas,'name');


    const options = Object.keys(data);

    console.log(options);
    return (
        <Autocomplete
            options={options}
            renderInput={(params)=><TextField {...params} label='Select Location'   variant='outlined'
            />}
            />
    )
}

export default LocationComponent;
