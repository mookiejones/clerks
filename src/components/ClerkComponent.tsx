import  {  useState} from 'react';
import {
    Container,
    Grid,
       TextField
} from '@mui/material';
import { makeTime } from '../utils';

import _ from 'lodash';


const ClerkComponent = (props:any)=>{

    
    
    const [selectedDate,setSelectedDate] = useState<string>( makeTime(new Date())); 

    const dateText=selectedDate?.toString();

    // Group all of the items by location name
    const grouped = _.groupBy(props.data.TruckDatas,'name');
  
   
    // Names of the locations
    const keys = Object.keys(grouped);
   
    return (
        <Container maxWidth='xl'>
            <Grid container direction='column'>
                <Grid item>
                    Truck Window Data
                </Grid>
                <Grid item>
                    <TextField
                        label="Date"
                        type='datetime-local'
                        value={dateText}
                        InputLabelProps={{
                            shrink:true
                        }}
                        />
                        <Grid item>

                        </Grid>

                </Grid>
            </Grid>
            <div>Clerk</div>

        </Container>
    )

}

export default ClerkComponent;