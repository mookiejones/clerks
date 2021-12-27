import React , { Fragment } from 'react';
import LoginForm from '../components/LoginForm';
import TitleBarComponent from '../components/TitleBarComponent';
import Container from '@material-ui/core/Container'

import { useNorplasClerks } from '../hooks/useNorplasClerks' 
import { makeStyles} from '@material-ui/core/styles'; 
const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
  }))
const MainContainer = () => {
    const classes = useStyles();
     
    const { registerTruck } = useNorplasClerks(); 

    return (
        <Fragment>
               <TitleBarComponent/>
             

               <Container maxWidth='xl'>

               <div className={classes.offset}/>
               <LoginForm onTruckChange={registerTruck}/>
               </Container>

        </Fragment>
    )
}
export default MainContainer;