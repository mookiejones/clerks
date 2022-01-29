import { useState, useMemo, useCallback} from 'react';
import { 
    GridToolbar 
} from '@mui/x-data-grid';

import {
    Button,
    ButtonGroup,
    FormGroup,
    FormControl,
    InputLabel
} from '@mui/material';

interface GridToolbarContainerProps {
    handleRowHeightChange?:(newValue:number)=>void
}


const GridSettingsPanel = (props: GridToolbarContainerProps) => {

    const [rowHeight,setRowHeight ] = useState<number>(50);

    

    const handleChange = (value:string)=>{

        let newValue = value === 'up'
        ? rowHeight + 10
        : rowHeight - 10;

        if (newValue>100)
        newValue=100;
        if(newValue<0)
        newValue=0;

        setRowHeight(newValue)

    }
    return (
        <FormGroup row>
            <FormControl variant='standard'>
            <InputLabel>{`Row Height: ${rowHeight}`}</InputLabel>
                <ButtonGroup>
                    <Button onClick={(e)=>handleChange('up')}>Up</Button>
                    <Button onClick={(e)=>handleChange('down')}>Down</Button>
                </ButtonGroup>
            </FormControl>
        </FormGroup>
    )
}

export default GridSettingsPanel;