import React, {  useState} from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import CopyrightComponent from './CopyrightComponent';
import AutoComplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField';
import { makeTime } from '../utils';
import moment from 'moment';
import Table from '@material-ui/core/Table';
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