
import {
    AppBar,
    Toolbar,
    Typography
} from '@mui/material'


export default function Titlebar() {
    return (
      
    <AppBar position='sticky' color='primary'  >
    <Toolbar>           
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Truck Window Data</Typography>
       
    </Toolbar>
</AppBar>
);
    }
