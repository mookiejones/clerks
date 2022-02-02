
import { useState , useMemo} from 'react';
import { TruckDataGridProps } from '../types';

import { makeTime } from '../utils'
import _ from 'lodash';

import {
    Autocomplete,
    Button,
    Container,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TextField,
    Typography,
    TableRow,
    Stack
} from '@mui/material'
 
 
const TruckDataGrid = (props:TruckDataGridProps) =>{
    const [selectedDate, setSelectedDate ] = useState<string>(makeTime(new Date()));


    
    // Need to get Locations

    const dateText = selectedDate?.toString();

    const truckDatas = props.data.TruckDatas ;

    const specialInstructions = props.data.SpecialInstructions;




    const grouped = _.groupBy(truckDatas,'name');

    

    const options = Object.keys(grouped);
    options.unshift("All")
    const [selectedLocation,setSelectedLocation] = useState(options[0]);



    const handleLocationChange = (_:any,b:any)=> setSelectedLocation(b);
  
    const rows = useMemo(()=>{
       let result =truckDatas.filter((o:any)=>selectedLocation==='All' || o.name===selectedLocation);

     





       return result;
    },[truckDatas,selectedLocation]);



    const getIn= (data:any) => (
        data ? data : <Button size='small' variant='contained'>Record</Button>
    )

    const getOut= (data:any) => (
        data ? data : <Button size='small' variant='contained'>Record</Button>
    )
    return (
        <Container maxWidth='xl'>
            <Stack>
                <Typography>
                    Truck Window Data
                </Typography>

                <Stack direction='row' spacing={3}>

                <TextField
                    fullWidth
                    label='Date'
                    type='datetime-local'
                    value={dateText}
                    />


                <Autocomplete
                fullWidth
                    autoHighlight
                    options={options}
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    renderInput={(params)=><TextField {...params} label='Select Location'   variant='outlined'
                    />}
        
                    />

                </Stack>

             <Table>
                 <TableHead>
                     <TableRow>
                         <TableCell>Hour/Minute</TableCell>
                         <TableCell>Asn</TableCell>
                         <TableCell>Carrier</TableCell>
                         <TableCell>SCAC</TableCell>
                        <TableCell>Route ID</TableCell>
                        <TableCell>Disposition</TableCell>
                        <TableCell>In</TableCell>
                        <TableCell>Out</TableCell>
                        <TableCell>Trailer</TableCell>
                        <TableCell>Shipper</TableCell>
                        <TableCell>Fill %</TableCell>
                        <TableCell>Dock ID</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Day 2 Cutoff</TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {
                         rows.map((o:any)=>(
                             <TableRow key={o.id}>
                                <TableCell>{`${o.hour}:${o.minute}`}</TableCell>
                                <TableCell>{o.asn===0?'No':'Yes'}</TableCell>
                                <TableCell>{o.carrier}</TableCell>
                                <TableCell>{o.scac}</TableCell>
                                <TableCell>{o.routeID}</TableCell>
                                <TableCell><Button size='small' variant='contained'>Cancel</Button></TableCell>
                                <TableCell>{getIn(o.timeIN)}</TableCell>
                                <TableCell>{getOut(o.timeOUT)}</TableCell>
                                <TableCell>
                                    <TextField defaultValue={o.trailer} fullWidth/>
                                </TableCell>
                                <TableCell>
                                    <TextField defaultValue={o.shipper} fullWidth/>
                                </TableCell>
                                <TableCell>
                                    <TextField defaultValue={o.fill} fullWidth/>
                                </TableCell>
                                <TableCell>
                                    <TextField defaultValue={o.dockID} fullWidth/>
                                </TableCell>
                                <TableCell>
                                    <TextField defaultValue={o.comment} fullWidth/>
                                </TableCell>
                                
                                <TableCell>{o.cutoff}</TableCell>                                                             
                             </TableRow>
                         ))
                     }

                 </TableBody>

             </Table>
            </Stack>
           
        </Container>
    )
}

export default TruckDataGrid;