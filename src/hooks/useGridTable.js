import { useState } from 'react';
import _ from 'lodash'
const testData = require('../testData.json');
export const useGridTable = () => {

    const [data,setData] = useState(testData.TruckDatas)



    const handleDataChange = value => {



        let index=_.findIndex(data,o=>o.id===value.id);

        if(index === -1)
            return;


        const newValue =  ({
            ...data[index],
            ...value
        });

        data[index] =newValue;

        console.log(value);

        setData([...data]);


    }

    return ({
        data,
        handleDataChange
    })

}