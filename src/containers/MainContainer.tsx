import  { Fragment } from 'react';
import LoginForm from '../components/LoginForm';
import TitleBarComponent from '../components/TitleBarComponent';
import { 
    Container
} from '@mui/material';

import { useNorplasClerks } from '../hooks/useNorplasClerks';
import { styled } from '@mui/material/styles';

const PREFIX = 'MainContainer';

const classes = {
    offset:`${PREFIX}-offset`
};

const Root = styled('div')(({theme})=>({
    [`&.${classes.offset}`]:theme.mixins.toolbar
}))

const MainContainer = () => {
  
     
    const { registerTruck } = useNorplasClerks(); 

    return (
            <Fragment>
                <TitleBarComponent/>


                <Container maxWidth='xl'>
                    <Root>
                        <div className={classes.offset}/>
                    </Root>
                    <LoginForm onTruckChange={registerTruck}/>
                </Container>
            </Fragment>
    )
}
export default MainContainer;