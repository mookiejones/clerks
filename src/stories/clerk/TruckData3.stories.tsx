import { ComponentStory, ComponentMeta } from '@storybook/react';
// import TruckDataGridComponent from './TruckDataGrid'
import TruckDataGridComponent from '../../components/TruckDataGrid2';
const data = require('../../api/testData.json');



export default {
    title: 'Clerk',
    component:TruckDataGridComponent
} as ComponentMeta<typeof TruckDataGridComponent>;


const Template: ComponentStory<typeof TruckDataGridComponent> = (args) => <TruckDataGridComponent {...args}/>

export const TruckDataGrid3 = Template.bind({})
TruckDataGrid3.args={
    data:data 
}