import {
    AppBar,
    Toolbar,
    Typography
} from '@mui/material'
import { makeStyles} from '@mui/styles';
import { createTheme,ThemeProvider} from '@mui/material/styles';
import { styled} from '@mui/material/styles';

import Logo from './Logo'

const version = require('../../package.json').version
 

const PREFIX = 'TitleBarComponent';
const classes = {
    title:`${PREFIX}-title`,
    toolbar:`${PREFIX}-toolbar`
}

const Root = styled('div')(({theme})=>({
    [`&.${classes.title}`]:{
        flexGrow:1
    },
    [`&.${classes.toolbar}`]:{
        minHeight: 128,
        alignItems: 'flex-start',
       
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    }
}))

const TitleBarComponent = () =>   (
       
    <Root>

        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
            <Logo color='#FFFFFF' />
            <div className={classes.title}/>
            <Typography  component="h1" variant="h4" align='right'>      
            { ` Norplas Clerks` }
        </Typography>
      
        <div className={classes.title}/>
    <Typography    align='right'>
         {version}
        </Typography>
        
            </Toolbar>
        </AppBar>
     
        </Root>

    )


export default TitleBarComponent;