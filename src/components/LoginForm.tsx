import { useState,useMemo } from 'react';
import { styled} from '@mui/material/styles';

import {
    TextField,
    Grid,
    FormControl,
    Button
} from '@mui/material';
 

const PREFIX = 'LoginForm';

const classes = {
    button:`${PREFIX}-button`,
    root:`${PREFIX}-root`,
    offset:`${PREFIX}-offset`
};

const Root = styled('div')(({theme}) =>({
    [`&.${classes.button}`]: {
        marginTop: theme.spacing(1)
    },
    [`&.${classes.root}`]:{
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
    },
    [`&.${classes.offset}`]: theme.mixins.toolbar
}))
 

type LoginProps = {
    onTruckChange:(loadId:string,trailer:string,driverName:string)=>void
}
const LoginForm = ({onTruckChange}:LoginProps) => {
    
    const [loadId,setLoadId] = useState<string>('');
    const [trailerNumber,setTrailerNumber] = useState<string>('');
    const [driverName,setDriverName] = useState<string>('');
 

    const notValid = useMemo(()=>!(loadId!=null && loadId.length>0 && trailerNumber!=null && trailerNumber.length>0 && driverName!=null && driverName.length>0),[loadId,trailerNumber,driverName])

    return (
            <Root >

            <Grid 
                container
                direction='column'  >
                
                <Grid item>
                    <FormControl fullWidth>
                        <TextField 
                            fullWidth
                            required
                            type='number'
                            value={loadId}
                            onChange={e =>setLoadId(e.currentTarget.value)}
                            label='Load ID'/>

                        <TextField
                            label='Trailer Number'
                            required
                            type='number'
                            value={trailerNumber}
                            onChange={e =>setTrailerNumber(e.currentTarget.value)}
                            fullWidth />
                        <TextField
                            label='Driver Name'
                            required
                            value={driverName}
                            onChange={e =>setDriverName(e.currentTarget.value)}
                            fullWidth />
                    </FormControl>
                </Grid>
                <Button
                sx={{ marginTop: 1}}
                    disabled={notValid}
                    className={classes.button} 
                    variant='contained' color='primary'
                    onClick={()=>onTruckChange(loadId,trailerNumber,driverName)}>
                    Login
                </Button>
     
 
                </Grid>
                </Root>

    )
}


export default LoginForm;