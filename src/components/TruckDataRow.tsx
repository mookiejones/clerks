import React, { Fragment, ChangeEvent, useState } from 'react';
import { TruckDataType } from '../types';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


interface TruckRowProp {
    key:string,
    idx:number,
    name:string,
    data:TruckDataType[]

}

export const TruckDataRow = ({ key, name, data,idx }: TruckRowProp) => {
    const classes = useRowStyles();
    const [open, setOpen] = useState(true);

    const col = idx % 2 == 0 ? "#BFBFBF":"#A4D3EE"

    const handleClick = () => setOpen(!open);

    return (
        <Fragment>
            <TableRow className={classes.root} style={{background:col}}>
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
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
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
                                                <Button variant='contained'>Cancel</Button>
                                            </TableCell>
                                            <TableCell>
                                                {truckData.timeIN === '' ? (<Button variant='contained'>Record</Button>) : truckData.timeIN}
                                            </TableCell>
                                            <TableCell>
                                                {truckData.timeOUT === '' ? (<Button variant='contained'>Record</Button>) : truckData.timeOUT}
                                            </TableCell>
                                            <TableCell>
                                                {truckData.trailer}
                                            </TableCell>
                                            <TableCell>
                                                0
                                            </TableCell>
                                            <TableCell>
                                                {truckData.dockID}
                                            </TableCell>
                                            <TableCell>
                                                {truckData.comment}
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