import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SignInComponent from '../components/SignInComponent';

export default {
    title:'SignIn',
    component:SignInComponent,
    argTypes: {
        loggedIn:{control:{type:'boolean'}}
    }
} as ComponentMeta<typeof SignInComponent>;



const Template: ComponentStory<typeof SignInComponent> = (args) => <SignInComponent {...args} />;
export const Primary = Template.bind({});
Primary.args = {
    notValid:false,
    user:{
        loadId:12345,
        trailerNumber:12345,
        driverName:"Charles",
        key:"p"
    },
    loggedIn:false,
    handleChangeLoad:(e,v)=>{},
    handleChangeTrailer:(e,v)=>{},
    handleChangeDriverName:(e,v)=>{}
}
