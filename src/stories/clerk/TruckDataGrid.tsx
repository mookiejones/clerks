
import { useState , useMemo} from 'react';
import { TruckDataType, TruckRowProp,TruckDataGridProps } from '../../types';
import TruckDataRow from './TruckDataRow';

import { makeTime } from '../../utils'
import _ from 'lodash';

import {
    Autocomplete,
    Container,
    Table,
    TextField,
    Typography,
    Stack
} from '@mui/material'
 
const TruckDataGrid = (props:TruckDataGridProps) =>{
    const [selectedDate, setSelectedDate ] = useState<string>(makeTime(new Date()));


    
    // Need to get Locations

    const dateText = selectedDate?.toString();

    const truckDatas = props.data.TruckDatas ;




    const grouped = _.groupBy(truckDatas,'name');

    

    const options = Object.keys(grouped);

    const [selectedLocation,setSelectedLocation] = useState(options[0]);
    const keys = Object.keys(grouped);


    const handleLocationChange = (_:any,b:any)=> setSelectedLocation(b);
    



    const isValidTruckData = (value:any) => {
        debugger;

        return true;
    }
    const rows = useMemo(()=>truckDatas.filter(isValidTruckData),[selectedLocation])
    return (
        <Container maxWidth='xl'>
            <Stack>
                <Typography>
                    Truck Window Data
                </Typography>
                <TextField
                    label='Date'
                    type='datetime-local'
                    value={dateText}
                    />


                <Autocomplete
                    autoHighlight
                    options={options}
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    renderInput={(params)=><TextField {...params} label='Select Location'   variant='outlined'
                    />}
        
                    />
                <Table>
                    {rows}
                {
                      keys.map((key,idx)=><TruckDataRow key={key} idx={idx} name={key} data={grouped[key]}/>)

                        
                    }
                </Table>
            </Stack>
            Truck Data
        </Container>
    )
}

export default TruckDataGrid;