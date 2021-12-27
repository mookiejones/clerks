import { useState,useMemo, ChangeEvent,useEffect  } from 'react'; 
import { clerksRef } from '../firebase'
import { UserProp} from '../types';
 
export const useSignIn = () => {

   
    const [loggedIn,setLoggedIn]=useState(false); 
    const [currentKey,setCurrentKey]=useState('')
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

    
    const handleChangeLoad = ({ target: { value }}:ChangeEvent<HTMLInputElement>) => {

        const result:UserProp = { 
            ...user,
            loadId:value
        }
        setUser(result);
       
    }


    const handleChangeTrailer =  ({ target: { value }}:ChangeEvent<HTMLInputElement>) => {
         
        const result:UserProp = { 
            ...user,
            trailerNumber:value
        }
        setUser(result);
    }


    const handleChangeDriverName =  ({ target: { value }}:ChangeEvent<HTMLInputElement>)=> {
        const result:UserProp = { 
            ...user,
            driverName:value
        }
        setUser(result);
    }
 
 

    const handleLogin = async () => {
     
       const response= await  clerksRef.push(user);

       const key = response.key

       setUser(user);
       setCurrentKey(key||'');

    }

    return {
        loggedIn,
        open:!loggedIn,
        handleClose:()=>{},
        notValid,
       user,
        handleChangeLoad,
        handleChangeTrailer,
        handleChangeDriverName,
        handleLogin
    }
}

