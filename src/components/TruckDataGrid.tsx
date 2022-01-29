
import { useState , useMemo, useCallback, Fragment} from 'react';
import { TruckDataType, TruckRowProp,TruckDataGridProps } from '../types';
import TruckDataRow from './TruckDataRow';

import { makeTime } from '../utils'
import _ from 'lodash';
import GridSettingsPanel from './GridSettingsPanel';
import { 
    DataGrid, 
    GridToolbar,
    GridColDef,
    GridValueGetterParams,
    GridRowHeightParams,
GridRenderCellParams} from '@mui/x-data-grid'

import {
    AppBar,    
    Autocomplete,
    Box,
    Button,
    Container,
    CssBaseline,
    IconButton,
    Paper,
    TableCell,
    TextField,
    Toolbar,
    Typography,
    Stack
} from '@mui/material'
 
import MenuIcon from '@mui/icons-material/Menu';
import ChangeSizeComponent from './ChangeSizeComponent';
const GridRow = (o:string,i:number) =>(
    <TableCell  key={`gridrow-${i}`}>
        {o}
    </TableCell>
)


const columns:GridColDef[] = [
    {field:'hourMinute',headerName:'Hour/Minute', valueGetter:(params:GridValueGetterParams)=>`${params.row.hour}:${params.row.minute}`},
    { field:'asn',headerName:'ASN',valueGetter:(params:GridValueGetterParams)=> 
        
         params.row.asn==='0'?'No':'Yes'
    },
    {field:'carrier',headerName:'Carrier'},
    {field:'scac',headerName:'SCAC'},
    {field:'routeID',headerName:'Route ID'},
    {field:'disposition', headerName:'Disposition',
    renderCell:(params: GridRenderCellParams<String>) => (
       <Button variant='contained' size='small'>Record</Button>
    )},
    {field:'timeIN',headerName:'In',
        renderCell:(params: GridRenderCellParams<String>) => (
            params.value.length ===0 ? <Button variant='contained' size='small'>Record</Button>:params.value
        )

    },
    {field:'timeOUT', headerName:'Out',
    renderCell:(params: GridRenderCellParams<String>) => (
        params.value.length ===0 ? <Button variant='contained' size='small'>Record</Button>:params.value
    )},
    {field:'trailer', headerName:'Trailer', editable:true},
    {field:'shipper', headerName:'Shipper', editable:true},
    {field:'fill',headerName:'Fill %', editable:true},
    {field:'dockID',headerName:'Dock ID', editable:true},
    {field:'comment',headerName:'Comment', editable:true},
    {field:'cutoff',headerName:'Day 2 Cutoff'}

]
const TruckDataGrid = (props:TruckDataGridProps) =>{
    const [selectedDate, setSelectedDate ] = useState<string>(makeTime(new Date()));


    /**
     * Standard row height so that the user can change the row height as they see fit
     */

    const [ rowHeight,setRowHeight] = useState(50);
    
    // Need to get Locations

    const dateText = selectedDate?.toString();

    const truckDatas = props.data.TruckDatas ;

    const specialInstructions = props.data.SpecialInstructions;




    const grouped = _.groupBy(truckDatas,'name');

    

    const options = Object.keys(grouped);
    options.unshift("All")
    const [selectedLocation,setSelectedLocation] = useState(options[0]);
    const keys = Object.keys(grouped);


    const handleLocationChange = (_:any,b:any)=> setSelectedLocation(b);
  
    const rows = useMemo(()=>{
       let result =truckDatas.filter((o:any)=>selectedLocation==='All' || o.name===selectedLocation);

     

       let truckSendToIds = result.map((o:any)=>o.order_sendto_id);


       let instructions = specialInstructions.filter((o:any)=>truckSendToIds.includes(o.order_sendto_id));



       return result;
    },[truckDatas,selectedLocation]);

    
    const rowColumns = useMemo(()=> Object.keys(truckDatas[0]),[truckDatas]);


   
    const handleGetRowHeight = useCallback(({ id, densityFactor }: GridRowHeightParams)=>{

        console.log(`density: ${densityFactor}`)
        if ((id as number) % 2 === 0) {
            return 100 * densityFactor;
          }
      
          return rowHeight;
    },[rowHeight])
  

    const handleChangeSizeComponentChange = (newValue:number) =>{

        setRowHeight(newValue);
    }
    return (
        <Fragment>
            <CssBaseline/>

            <Box
           
            >


            <AppBar position='sticky' color='primary'  >
                <Toolbar>           
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Truck Window Data</Typography>
                    <ChangeSizeComponent 
                        value={rowHeight}
                        handleValueChange={handleChangeSizeComponentChange}
                    />
                </Toolbar>
            </AppBar>
        <Paper square sx={{ pb: '50px' }}>

        
      
        
        <Paper sx={{marginTop:2, marginpBottom:2}}>

                        
                <Stack direction='row' spacing={3} >

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
                    sx={{mb:2}}
                    renderInput={(params)=><TextField {...params} label='Select Location'   variant='outlined'
                    />}
        
                    />

                </Stack>
                </Paper>
              
              <div style={{height:'80vh',overflow:'auto'}}>
              <Paper >
                <DataGrid
                
                     autoHeight
                    rows={rows}
                    columns={columns}
                    autoPageSize={false}

                    getRowHeight={handleGetRowHeight}
                    
              

                    />
             
             
       </Paper>
           
             </div>

       
        </Paper>
        </Box>

        </Fragment>


    )
}

export default TruckDataGrid;