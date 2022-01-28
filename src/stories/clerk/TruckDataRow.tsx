import React, { Fragment, ChangeEvent, useState } from 'react';
import { TruckDataType } from '../../types';
import {

    Table,
    TableCell,
    TableBody,
    TextField,
    TableHead,
    TableRow,
    Collapse,
    IconButton,
    Box,
    Typography,
    Button
} from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

 

interface TruckRowProp {
    key:string,
    idx:number,
    name:string,
    data:TruckDataType[]

}

export const TruckDataRow = ({ key, name, data,idx }: TruckRowProp) => {

    const [open, setOpen] = useState(false);

    const col = idx % 2 === 0 ? "#BFBFBF":"#A4D3EE"

    const handleClick = () => setOpen(!open);

    return (
        <Fragment>
            <TableRow   sx={{background:col}}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={handleClick}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small">
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
                                    {data.map((truckData: TruckDataType) => (
                                        <TableRow key={truckData.id}>
                                            <TableCell component='th' scope='row'>
                                                {`${truckData.hour}:${truckData.minute}`}
                                            </TableCell>
                                            <TableCell>
                                                No
                                            </TableCell>
                                            <TableCell>
                                                {truckData.carrier}
                                            </TableCell>
                                            <TableCell>
                                                {truckData.scac}
                                            </TableCell>
                                            <TableCell>
                                                {truckData.routeID}
                                            </TableCell>
                                            <TableCell>
                                                <Button size="small" variant='contained'>Cancel</Button>
                                            </TableCell>
                                            <TableCell>
                                                {truckData.timeIN === '' ? (<Button size="small" variant='contained'>Record</Button>) : truckData.timeIN}
                                            </TableCell>
                                            <TableCell>
                                                {truckData.timeOUT === '' ? (<Button size="small" variant='contained'>Record</Button>) : truckData.timeOUT}
                                            </TableCell>
                                            <TableCell>
                                                <TextField value={truckData.trailer}/>

                                            </TableCell>
                                            <TableCell>
                                            <TextField value={0}/>
                                            </TableCell>
                                            <TableCell>
                                            <TextField value={0}/>
                                            </TableCell>
                                            <TableCell>
                                               
                                                <TextField value={truckData.dockID}/>
                                            </TableCell>
                                            <TableCell>
                                            <TextField value={truckData.comment}/>
                                                
                                            </TableCell>
                                            <TableCell>
                                                {truckData.cutoff}
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default TruckDataRow;