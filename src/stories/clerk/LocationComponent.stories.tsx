import { ComponentStory, ComponentMeta } from '@storybook/react';
import LocationComponent from './LocationComponent'

const data = require('../../api/testData.json');



export default {
    title: 'Clerk',
    component:LocationComponent
} as ComponentMeta<typeof LocationComponent>;


const Template: ComponentStory<typeof LocationComponent> = (args) => <LocationComponent {...args}/>

export const Location = Template.bind({})
Location.args={
    data:data,
   

}