
import './App.css';
import GridTableContainer from './containers/GridTableContainer';
import DataProvider from './DataContext'
function App() {
  return (
    <DataProvider>

    <div className="App">
     <GridTableContainer/>
    </div>
    </DataProvider>
  );
}

export default App;
