import { useState } from 'react';

import {
    ButtonGroup,
    IconButton,
    Typography
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
interface ChangeSizeComponentProps {
    value:number;
    handleValueChange : (value:number)=>void;
}

/**
 * ChangeSizeComponent to change row height
 * @param props {ChangeSizeComponentProps}
 * @returns 
 */
const ChangeSizeComponent = (props:ChangeSizeComponentProps) =>{


    /**
     * Calculates the new row value 
     */
    const handleValueChange = (direction:number) =>{
        let newValue = props.value + direction;

        let result = newValue> 100 
                    ?100
                    : newValue <0
                    ? 0
                    :newValue;

        props.handleValueChange(result);
    }

    
    return (
        <ButtonGroup>
            <IconButton size='small'   onClick={()=>handleValueChange(10)}>
                <KeyboardArrowUpIcon/>

            </IconButton>
            <IconButton size='small'  onClick={()=>handleValueChange(-10)}>
                <KeyboardArrowDownIcon/>
            </IconButton>
            <Typography>{`Row Height : ${props.value}`}</Typography>
        </ButtonGroup>
    )

}

export default ChangeSizeComponent;