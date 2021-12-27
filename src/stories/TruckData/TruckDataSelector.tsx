import React, {  useState,useEffect,useMemo,Fragment} from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import CopyrightComponent from '../../components/CopyrightComponent';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import _ from 'lodash';

import { makeTime } from '../../utils'; 
import AutoComplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



interface TruckDataSelectorProps {
    data:[]
}

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: '85vh',
    },
  });
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


export const TruckDataRow = (o) => {
    const classes = useRowStyles();
    const [open, setOpen] = useState(true);

    debugger;
    // const col = idx % 2 == 0 ? "#BFBFBF":"#A4D3EE"

    const handleClick = () => setOpen(!open);

    return (
        
                                        <TableRow key={o.id}>
                                            <TableCell component='th' scope='row'>
                                                {`${o.hour}:${o.minute}`}
                                            </TableCell>
                                            <TableCell>
                                                No
                                            </TableCell>
                                            <TableCell>
                                                {o.carrier}
                                            </TableCell>
                                            <TableCell>
                                                {o.scac}
                                            </TableCell>
                                            <TableCell>
                                                {o.routeID}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant='contained'>Cancel</Button>
                                            </TableCell>
                                            <TableCell>
                                                {o.timeIN === '' ? (<Button variant='contained'>Record</Button>) : o.timeIN}
                                            </TableCell>
                                            <TableCell>
                                                {o.timeOUT === '' ? (<Button variant='contained'>Record</Button>) : o.timeOUT}
                                            </TableCell>
                                            <TableCell>
                                                {o.trailer}
                                            </TableCell>
                                            <TableCell>
                                                0
                                            </TableCell>
                                            <TableCell>
                                                {o.dockID}
                                            </TableCell>
                                            <TableCell>
                                                {o.comment}
                                            </TableCell>
                                            <TableCell>
                                                {o.cutoff}
                                            </TableCell>

                                        </TableRow>
                                   
    )
}

const TruckDataSelector = (props:TruckDataSelectorProps) => {

  
    const classes = useStyles();
    
    const [selectedDate,setSelectedDate] = useState<string>( makeTime(new Date())); 

    const [selectedLocation,setSelectedLocation] = useState<string>('');


    const handleDateTimeChange=( event)=>{
        const value = event.target.value;
        setSelectedDate(value);

    }
    const dateText = selectedDate?.toString();
   

    const grouped = _.groupBy(props.data,'name');
  
   
    const keys = Object.keys(grouped);
 
    const isValidItem = item =>{
        return selectedLocation === '' || item.name===selectedLocation

    }
   

    // const validItems = useMemo(()=>props.data.filter(isValidItem));
    const validItems = props.data.filter(isValidItem);
   
    debugger;
    return (
        <Container maxWidth='xl'>


     
            <Grid container direction='column'>
                <Grid item>
                Truck Window Data
                </Grid>
          
         <Grid container  direction='row'>

            <Grid item xs={4}>
                <AutoComplete
                    id='location-selector'
                    fullWidth
                        options={keys}
                        renderInput={(params)=><TextField {...params} label='Select Location'/>}
                        onChange={(e,v)=>setSelectedLocation(v)}

                    /> 
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>

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
             

          </Grid>

                <Grid item>
                    <TableContainer className={classes.container}>

                  <Table stickyHeader>
                     
                      <TableHead>
                                    <TableRow>
                                        <TableCell>Hour/Minute</TableCell>
                                        <TableCell>ASN</TableCell>
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

                        validItems
                        .map((o)=><TruckDataRow {...o}/>)


                        
                    }
                      </TableBody>

                  </Table>
                  </TableContainer>

                </Grid>
                <Grid item>
                    <CopyrightComponent/>
                </Grid>
            </Grid>
            </Container>
  )
}

export default TruckDataSelector;