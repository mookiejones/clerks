
import { useState ,   useMemo} from 'react';
import {  TruckDataGridProps, TruckDataType, Row } from '../types'; 
import { groupBy as rowGrouper } from 'lodash';
import { makeTime } from '../utils'
import _ from 'lodash';
import Titlebar from './Titlebar';
import DataGrid,{Column} from 'react-data-grid'
 


import {

    Autocomplete,


    Paper,
    Grid,
    Stack
} from '@mui/material'
 
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  


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

    const formattedData = useMemo<Row[]>(() =>props.data.TruckDatas.map((d:TruckDataType) =>({
        ...d,
        asn: d.asn === '0' ? 'Yes':'No', 
        hourMinute: `${d.hour}:${d.minute}`
    })),[props]);

    const rows: Row[] = formattedData;
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
  
    const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
        () => new Set<unknown>(['United States of America', 'United States of America__2015'])
      );


    return (
            <Stack>
                
            <Titlebar/>




            <Grid 
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
             >
                <Grid item xs={6}>
                <Item>1</Item>
                </Grid>
                <Grid item xs={6}>
                <Item>2</Item>
                    
                </Grid>
                <Grid item xs={12}>
                <Item>3</Item>
                    
                </Grid>

            </Grid>
  




                          </Stack>

    )
}

export default TruckDataGrid;