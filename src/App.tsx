import RouteContainer from "./containers/RouteContainer";

import { createTheme,ThemeProvider} from '@mui/material/styles';

const theme = createTheme();
  
const App = () =>   (
        <ThemeProvider theme={theme}>
            <RouteContainer/>
        </ThemeProvider>
    )
export default App;