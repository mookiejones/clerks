import { ChangeEvent} from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {SignInComponent} from '../../components/SignInComponent'



export default {
    title: 'Driver',
    component:SignInComponent
} as ComponentMeta<typeof SignInComponent>;


const Template: ComponentStory<typeof SignInComponent> = (args) => <SignInComponent {...args}/>

export const SignIn = Template.bind({})
SignIn.args={
   
     
}