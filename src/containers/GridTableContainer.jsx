import { useContext } from "react";
import GridTable from "../GridTable"

import { DataContext } from "../DataContext";

const GridTableContainer = () => {

    const {data,handleDataChange} = useContext(DataContext);

    return (
        <GridTable
            data={data}
            handleDataChange={handleDataChange}
        />
    )
}

export default GridTableContainer;