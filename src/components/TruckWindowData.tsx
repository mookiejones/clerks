import React, { ChangeEvent, useState} from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import CopyrightComponent from './CopyrightComponent';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import _ from 'lodash';
import TruckDataRow from './TruckDataRow';
import { makeTime } from '../utils';
 
const TruckWindowData = (props:any) => {

  
    
    const [selectedDate,setSelectedDate] = useState<string>( makeTime(new Date())); 

    const handleDateTimeChange=( event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const value = event.target.value;
        setSelectedDate(value);

    }
    const dateText = selectedDate?.toString();
   

    const grouped = _.groupBy(props.data.TruckDatas,'name');
  
   
    const keys = Object.keys(grouped);
   
    return (
        <Container maxWidth='xl'>


     
            <Grid container direction='column'>
                <Grid item>
                Truck Window Data
                </Grid>
          
                <Grid item>
                    <TextField
                        label='Date'
                        type='datetime-local'
                        value={dateText}
                        onChange={handleDateTimeChange}
                        InputLabelProps={{
                            shrink: true,
                          }}
                        />
                </Grid>
                <Grid item>
                  <Table>
                    {
                      keys.map((key,idx)=><TruckDataRow key={key} idx={idx} name={key} data={grouped[key]}/>)

                        
                    }

                  </Table>
                </Grid>
                <Grid item>
                    <CopyrightComponent/>
                </Grid>
            </Grid>
            </Container>
  )
}

export default TruckWindowData;