import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TruckDataTable from './TruckData/TruckDataTable';

const testData = require('../api/testData.json');

export default {
    title:'TruckData/Table',
    component:TruckDataTable,
    argTypes: {
       
    }
} as ComponentMeta<typeof TruckDataTable>;



const Template: ComponentStory<typeof TruckDataTable> = (args) => <TruckDataTable {...args} />;
export const Primary = Template.bind({});
 Primary.args={
     data:testData.TruckDatas
 }