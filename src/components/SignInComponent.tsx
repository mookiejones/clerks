import { useState, useMemo,ChangeEvent } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    TextField,
Typography 
} from '@mui/material';
import { styled} from '@mui/material/styles';

import {  } from '@mui/material/colors'
// Need to fix this once imported
import Logo from './Logo';
import CopyrightComponent from './CopyrightComponent';
import {  SignInProps } from '../types'




const PREFIX = 'SignInComponent';
const classes = {
    root: `${PREFIX}-root`,
    paper:`${PREFIX}-paper`,
    avatar:`${PREFIX}-avatar`,
    form:`${PREFIX}-form`,
    submit:`${PREFIX}-submit`
};



const Root = styled('div')(({theme})=>({
   
    [`&.${classes.paper}`]:{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      [`&.${classes.avatar}`]:{
      
        padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      },
      [`&.${classes.form}`]:{
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      [`&.${classes.submit}`]:{
        margin: theme.spacing(3, 0, 2),
      }
}))

 


export const SignInComponent = ({isLoggedIn,onClick  }:SignInProps) =>{

    
    const [loadId,setLoadId] = useState('');
    const [ trailerId,setTrailerId] = useState('');
    const [ driverName, setDriverName]= useState('');


    const canSignIn = useMemo(()=> loadId !== '' && trailerId !== '' && driverName !== '' ,[loadId,trailerId,driverName])


  



    const handleChangeLoadId = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>     setLoadId(e.target.value);



    const handleChangeTrailer = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setTrailerId(e.target.value);


    const handleChangeDriverName = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=> setDriverName(e.target.value);


    const onLogin = () =>{
        if(onClick!=null)
        onClick({loadId,trailerId,driverName});
    }


    return (
        <Root  >
       

        <Container maxWidth='xs' component='main'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar sx={{ bgcolor:'white', padding:1}} className={classes.avatar}>
                    <Logo small/>
                </Avatar>
               <Typography >
                   Sign In
               </Typography>
               <Box component='form'
               noValidate
               autoComplete='off'
        >
             

               <Stack spacing={3} sx={{marginTop:3}}>

                   <TextField
                        label='Load ID'
                        fullWidth
                        required
                        type='number'
                        autoFocus
                        defaultValue=''
                        onChange={handleChangeLoadId}
                   />

                   <TextField
                        label="Trailer Number"
                        fullWidth
                        required
                        defaultValue=''
                        onChange={handleChangeTrailer}
                        />

                    <TextField
                        label="Driver Name"
                        fullWidth
                        required
                        defaultValue=''
                        onChange={handleChangeDriverName}
                        />

                    <Button 
                        variant='contained' 
                        color='primary'
                        fullWidth
                        onClick={onLogin}
                        disabled = {!canSignIn} >Sign In</Button>
               </Stack>
              
               </Box>
            </div>
            <CopyrightComponent/>
    
    </Container>
   

    </Root>
)

};

export default SignInComponent;