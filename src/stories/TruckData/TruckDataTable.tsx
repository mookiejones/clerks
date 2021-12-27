import React, {  useState} from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import CopyrightComponent from '../../components/CopyrightComponent';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import _ from 'lodash';
import TruckDataRow from '../../components/TruckDataRow';
import { makeTime } from '../../utils';
 
interface TruckDataTableProps {
    data:[]
}
const TruckDataTable = (props:TruckDataTableProps) => {

  
    
    const [selectedDate,setSelectedDate] = useState<string>( makeTime(new Date())); 

    const handleDateTimeChange=( event)=>{
        const value = event.target.value;
        setSelectedDate(value);

    }
    const dateText = selectedDate?.toString();
   

    const grouped = _.groupBy(props.data,'name');
  
   
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

export default TruckDataTable;