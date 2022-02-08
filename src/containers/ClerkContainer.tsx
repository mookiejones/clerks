import React  from 'react';

import TruckDataGrid from '../components/TruckDataGridBootstrap'
import {useData} from '../hooks/useData';
 
const ClerkContainer = () => {

    const { data } = useData();

 
    return (<TruckDataGrid data={data}/>)
}

export default ClerkContainer;