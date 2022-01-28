import { useState,useMemo, useEffect  } from 'react'; 
import { clerksRef } from '../firebase'
import { UserProp, LoginType} from '../types';
 
export const useSignIn = () => {

   
    const [loggedIn,setLoggedIn]=useState(false); 
    const [currentKey,setCurrentKey]=useState('');
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [user,setUser]=useState<UserProp>({
        loadId:'',
        trailerNumber:'',
        driverName:'',
        key:''
    })
 


    const notValid = useMemo(()=>!(user.loadId!=null && user.loadId.length>0 && user.trailerNumber!=null && user.trailerNumber.length>0 && user.driverName!=null && user.driverName.length>0),[user]);

    
    useEffect(()=>{
        const handleValue = (snapshot:any) =>{
            const val = snapshot.val()||{};

            const value = Object.keys(val);        
            const result = value.includes(currentKey);
         
            setLoggedIn( result);
    
        }

        clerksRef.on('value',handleValue);

        return () =>{
            clerksRef.off('value',handleValue)
        } 



    },[currentKey]

    )

    const onClick = async (value:LoginType) =>{
        debugger;
    }

       
 

    const handleLogin = async () => {
     
       const response= await  clerksRef.push(user);

       const key = response.key

       setUser(user);
       setCurrentKey(key||'');

    }

    return {
        isLoggedIn,
        loggedIn,
        open:!loggedIn,
        handleClose:()=>{},
        notValid,
       user,
       onClick,
       
        handleLogin
    }
}

