import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


import {LocationComponent} from './Location'
const testData = require('../api/testData.json');

 

const onChange = (e:any,value:any) => {
    console.log(value);

}
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Location/Selector',
  component: LocationComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
      items:{
          table:{
              disable:true
          }
      } 
  },
} as ComponentMeta<typeof LocationComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LocationComponent> = (args) => <LocationComponent {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    items:testData.TruckDatas,
    onChange:onChange

};
 