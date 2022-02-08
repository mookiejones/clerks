
import { useState ,  Fragment, useMemo,ChangeEvent} from 'react';
import {  TruckDataGridProps, Row } from '../types'; 
import { makeTime } from '../utils'
import _ from 'lodash';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form' 
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    AppBar,    
    Autocomplete,


    Paper,

    TextField,
    Toolbar,
    Typography,
    Stack
} from '@mui/material'
 

   

  

/**
 * React Data Grid Component to handle Truck Data
 * @param props 
 * @returns 
 */
const TruckDataGridBootstrap = (props:TruckDataGridProps) =>{

     

    const rows: Row[] = props.data.TruckDatas;
    const [selectedDate, setSelectedDate ] = useState<string>(makeTime(new Date()));
  
    
    // Need to get Locations

    const dateText = selectedDate?.toString();

    const truckDatas = props.data.TruckDatas ;

    const grouped = _.groupBy(truckDatas,'name');

    const options = Object.keys(grouped);
    options.unshift("All")
    const [selectedLocation,setSelectedLocation] = useState(options[0]);

    const handleLocationChange = (_:any,b:any)=> setSelectedLocation(b);
  
     const handleDateChange = (e:ChangeEvent<HTMLInputElement>) =>{
         debugger;
         setSelectedDate(e);
     }

      const getBootStrapRow = (row:Row) => {



          return (
              <tr>
                  <td>{row.hourMinute}</td>
                  <td>{row.asn}</td>
                  <td>{row.carrier}</td>
                  <td>{row.scac}</td>
                  <td>{row.routeID}</td> 
                  <td>{ row.disposition === '0' || row.disposition === 0 ? <Button size='sm' variant='secondary'>Disposition</Button>:row.disposition}</td>
                  <td>{ row.timeIN === '' ? <Button size='sm' variant='secondary'>Enter</Button>:row.timeIN}</td>
                  <td>{ row.timeOUT === '' ? <Button size='sm' variant='secondary'>Enter</Button>:row.timeOUT}</td>
                  <td><Form.Control type='text' defaultValue={row.trailer}/></td>
                  <td><Form.Control type='text' defaultValue={row.shipper}/></td>
                  <td><Form.Control type='text' defaultValue={row.dockID}/></td>
                  <td><Form.Control type='text' defaultValue={row.comment}/></td>
                  <td>{row.name}</td>
                  <td>{row.cutoff}</td>
              </tr>
          )
      }

    return (
            <Fragment>
                
            <AppBar position='sticky' color='primary'  >
                <Toolbar>           
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Truck Window Data</Typography>
                   
                </Toolbar>
            </AppBar>


  
            <Paper sx={{marginTop:2, marginBottom:2}}>

                        
<Stack direction='row' spacing={3} >

<TextField
    fullWidth
    label='Date'
    type='datetime-local'
    value={dateText}
    onChange={handleDateChange}
    />


<Autocomplete
fullWidth
    autoHighlight
    options={options}
    value={selectedLocation}
    onChange={handleLocationChange}
    sx={{mb:2}}
    renderInput={(params)=><TextField {...params} label='Select Location'   variant='outlined'
    />}

    />

</Stack>
</Paper>

<Stack>

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Hour/Minute</th>
                            <th>ASN</th>
                            <th>Carrier</th>
                            <th>SCAC</th>
                            <th>Route ID</th>
                            <th>Disposition</th>
                            <th>In</th>
                            <th>Out</th>
                            <th>Trailer</th>
                            <th>Shipper</th>
                            <th>Dock ID</th>
                            <th>Comment</th>
                            <th>Name</th>
                            <th>Day 2 Cutoff</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map(getBootStrapRow)
                        }
                    </tbody>

                </Table>
                    </Stack>

                          </Fragment>

    )
}

export default TruckDataGridBootstrap;