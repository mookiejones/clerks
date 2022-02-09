import { createContext, useState } from 'react';
import _ from 'lodash'
const testData = require('./testData.json');

export const DataContext  = createContext();

const DataProvider = ({children}) => {
    const [data,setData] = useState(testData.TruckDatas);



    const handleDataChange = value => {
        let index = _.findIndex(data,o=>o.id === value.id);

        if(index === -1){
            console.error('Wrong value for index');
            return ;
        }

        const newValue =  ({
            ...data[index],
            ...value
        });

        data[index] =newValue;

        console.log(value);

        setData([...data]);




    }


    return (
        <DataContext.Provider value={{
            data:data,
            handleDataChange
        }} >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider