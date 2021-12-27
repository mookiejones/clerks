import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TruckDataSelector from './TruckData/TruckDataSelector';

const testData = require('../api/testData.json');

export default {
    title:'TruckData/Selector',
    component:TruckDataSelector,
    argTypes: {
       
    }
} as ComponentMeta<typeof TruckDataSelector>;



const Template: ComponentStory<typeof TruckDataSelector> = (args) => <TruckDataSelector {...args} />;
export const Primary = Template.bind({});
 Primary.args={
     data:testData.TruckDatas
 }