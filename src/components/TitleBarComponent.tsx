import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from './Logo'
import { makeStyles} from '@material-ui/core/styles';
const version = require('../../package.json').version
const useStyles=makeStyles((theme)=>({
    title:{flexGrow:1},
    toolbar: {
        minHeight: 128,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
      },
}));


const TitleBarComponent = () => {
    const classes = useStyles()

    return (
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
    )
}

export default TitleBarComponent;