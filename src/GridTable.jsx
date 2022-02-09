import 'bootstrap/dist/css/bootstrap.min.css'
import {Table, Button, Form} from 'react-bootstrap';
import moment from 'moment'
 import Topbar from './Topbar'


 
const GridTable = ({data,handleDataChange}) => {


    
    const getBootStrapRow = (row) => {
        const { id} = row;
        
        return (
            <tr key={`row-${row.id}`}>
                <td>{`${row.hour}:${row.minute}`}</td>
                <td>{row.asn === '0'?'No':'Yes'}</td>
                <td>{row.carrier}</td>
                <td>{row.scac}</td>
                <td>{row.routeID}</td> 
                <td>{ row.disposition === '0' || row.disposition === 0 ? <Button size='sm' variant='secondary'>Cancel</Button>:row.disposition}</td>
                <td>{ row.timeIN === '' ? <Button id='timeIN' size='sm' onClick={()=>handleDataChange({id,'timeIN':moment().format('hh:mm')})} variant='secondary'>Record</Button>:row.timeIN}</td>
                <td>{ row.timeOUT === '' ? <Button id='timeOUT' size='sm' onClick={()=>handleDataChange({id,'timeOUT':moment().format('hh:mm')})} variant='secondary'>Record</Button>:row.timeOUT}</td>
                <td><Form.Control type='text' defaultValue={row.trailer} onChange={e=>handleDataChange({id:row.id,trailer:e.target.value})}/></td>
                <td><Form.Control type='text' defaultValue={row.shipper} onChange={e=>handleDataChange({id:row.id,shipper:e.target.value})}/></td>
                <td><Form.Control type='number' defaultValue={row.fill}    onChange={e=>handleDataChange({id:row.id,fill:e.target.value})}/></td>
                <td><Form.Control type='number' defaultValue={row.dockID}  onChange={e=>handleDataChange({id:row.id,dockID:e.target.value})}/></td>
                <td><Form.Control type='text' defaultValue={row.comment} onChange={e=>handleDataChange({id:row.id,comment:e.target.value})}/></td>
                <td>{row.cutoff}</td>
            </tr>
        )
    }

    return (
        <div>
            <Topbar/>
          

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
                            <th>Fill %</th>
                            <th>Dock ID</th>
                            <th>Comment</th>
                            <th>Day 2 Cutoff</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(getBootStrapRow)
                        }
                    </tbody>

        </Table>

        </div>
    )

}

export default GridTable;