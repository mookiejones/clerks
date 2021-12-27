import { useState,useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
const useStyles = makeStyles(theme=>({
    button:{
        marginTop:theme.spacing(1)
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
      offset: theme.mixins.toolbar,

}))

type LoginProps = {
    onTruckChange:(loadId:string,trailer:string,driverName:string)=>void
}
const LoginForm = ({onTruckChange}:LoginProps) => {
    const classes=useStyles();
    const [loadId,setLoadId] = useState<string>('');
    const [trailerNumber,setTrailerNumber] = useState<string>('');
    const [driverName,setDriverName] = useState<string>('');
 

    const notValid = useMemo(()=>!(loadId!=null && loadId.length>0 && trailerNumber!=null && trailerNumber.length>0 && driverName!=null && driverName.length>0),[loadId,trailerNumber,driverName])

    return (<Grid 
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
                    disabled={notValid}
                    className={classes.button} 
                    variant='contained' color='primary'
                    onClick={()=>onTruckChange(loadId,trailerNumber,driverName)}>
                    Login
                </Button>
     
 
                </Grid>

    )
}


export default LoginForm;