import React, { ChangeEvent, useState} from 'react';
import { 
  Container,
  Grid,
  TextField,
  Table
} from '@mui/material'
import CopyrightComponent from './CopyrightComponent';
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
                Truck Window Datas
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