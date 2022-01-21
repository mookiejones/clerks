import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'; 
import Container from '@material-ui/core/Container';
import Copyright from './CopyrightComponent';
import Logo from './Logo';
import { SignInComponentProps } from '../types';


// Create Styles for component
const useStyles = makeStyles((theme) =>  ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      
      padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const SignInComponent = (props:SignInComponentProps) => {


  const {   notValid,
    user ,
    loggedIn,
    handleChangeLoad,
    handleChangeTrailer,
    handleChangeDriverName,
    handleLogin
  } = props;
    const classes = useStyles();

    
   
 


 
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Logo small/>
          </Avatar> 
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="loadId"
                  name="loadId"
                  variant="outlined"
                  fullWidth
                  required
                  type='number'
                  id="loadId"
                  label="Load ID"

                  onChange={a=>{
                    debugger;
                  }}
                  value={user.loadId}
                  autoFocus
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="trailer"
                  type='number'
                  label="Trailer Number"
                  name="trailer"
                  autoComplete="trailer"
                  value={user.trailerNumber}
                  onChange={e=>{
                    debugger;
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="driverName"
                  label="Driver Name"
                  type="text"
                  id="driverName"
                  autoComplete="driverName"
                  value={user.driverName}
                  onChange={handleChangeDriverName}
                />
              </Grid>
              
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={notValid}
              onClick={handleLogin}

            >
              Sign In
            </Button>
            </form>
            {`User Logged In : ${loggedIn}`}
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }

  export default SignInComponent;