
import { useState ,  Fragment, useMemo} from 'react';
import {  TruckDataGridProps, Row } from '../types'; 
import { groupBy as rowGrouper } from 'lodash';
import { makeTime } from '../utils'
import _ from 'lodash';

import DataGrid,{Column} from 'react-data-grid'
 


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
 * Configuration ofr each row
 */
const columns:Column<Row>[] = [
    {key:'hourMinute',name:'Hour/Minute'},
    { key:'asn',name:'ASN' },
    {key:'carrier',name:'Carrier'},
    {key:'scac',name:'SCAC'},
    {key:'routeID',name:'Route ID'},
    {key:'disposition', name:'Disposition'},
    {key:'timeIN',name:'In'},
    {key:'timeOUT', name:'Out'},
    {key:'trailer', name:'Trailer', editable:true},
    {key:'shipper', name:'Shipper', editable:true},
    {key:'fill',name:'Fill %', editable:true},
    {key:'dockID',name:'Dock ID', editable:true},
    {key:'comment',name:'Comment', editable:true},
    {key:'name',name:'Name'},
    {key:'cutoff',name:'Day 2 Cutoff'}
]


const rowKeyGetter = (row:Row) =>{
    return row.id;
}
  

/**
 * React Data Grid Component to handle Truck Data
 * @param props 
 * @returns 
 */
const TruckDataGrid = (props:TruckDataGridProps) =>{

    

    const rows: Row[] = props.data.TruckDatas;
    const [selectedDate, setSelectedDate ] = useState<string>(makeTime(new Date()));

    /**
     * options to group by
     */
    const selectedOptions = ['name'];

    /**
     * Standard row height so that the user can change the row height as they see fit
     */

    const [ rowHeight,setRowHeight] = useState(50);
    
    // Need to get Locations

    const dateText = selectedDate?.toString();

    const truckDatas = props.data.TruckDatas ;

    const grouped = _.groupBy(truckDatas,'name');

    const options = Object.keys(grouped);
    options.unshift("All")
    const [selectedLocation,setSelectedLocation] = useState(options[0]);

    const handleLocationChange = (_:any,b:any)=> setSelectedLocation(b);
  
    const handleDateChange = (_:any,b:any)=>{
        debugger;
        setSelectedDate(b);
    }
    const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
        () => new Set<unknown>(['United States of America', 'United States of America__2015'])
      );


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

<div className='rdg-table-container'>

                <DataGrid
                    columns={columns}
                    rows={rows}
                    rowKeyGetter={rowKeyGetter}
                    groupBy={selectedOptions}
                    rowGrouper={rowGrouper}
                    expandedGroupIds={expandedGroupIds}
                    onExpandedGroupIdsChange={setExpandedGroupIds}
                    defaultColumnOptions={{ resizable: true }}
                    className="fill-grid"
                    />
                    </div>
                    </Stack>

                          </Fragment>

    )
}

export default TruckDataGrid;