import { ComponentStory, ComponentMeta } from '@storybook/react';
import TruckDataGridComponent from './TruckDataGrid'

const data = require('../../api/testData.json');



export default {
    title: 'Clerk',
    component:TruckDataGridComponent
} as ComponentMeta<typeof TruckDataGridComponent>;


const Template: ComponentStory<typeof TruckDataGridComponent> = (args) => <TruckDataGridComponent {...args}/>

export const TruckDataGrid = Template.bind({})
TruckDataGrid.args={
    data:data 
}