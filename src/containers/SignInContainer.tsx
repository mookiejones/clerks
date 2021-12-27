import SignInComponent from "../components/SignInComponent";
import { useSignIn} from '../hooks/useSignIn'



const SignInContainer = () => {
    const {  notValid,
        user ,
        loggedIn,
        handleChangeLoad,
        handleChangeTrailer,
        handleChangeDriverName,
        handleLogin
     } = useSignIn();


     const props = {  notValid,
        user ,
        loggedIn,
        handleChangeLoad,
        handleChangeTrailer,
        handleChangeDriverName,
        handleLogin
     } 
     return <SignInComponent {...props}/>
}

export default SignInContainer;