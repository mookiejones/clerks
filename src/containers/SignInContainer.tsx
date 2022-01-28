import SignInComponent from "../components/SignInComponent";
import { useSignIn} from '../hooks/useSignIn'



const SignInContainer = () => {
    const { 
         isLoggedIn,
         onClick  
     } = useSignIn();


     const props = {  
        isLoggedIn,
        onClick 
     } 
     return <SignInComponent {...props}/>
}

export default SignInContainer;