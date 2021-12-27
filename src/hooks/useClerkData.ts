import { useState,useMemo, ChangeEvent,useEffect  } from 'react'; 
import { clerksRef } from '../firebase'
import { UserProp} from '../types';
import { GetShippingData } from '../api';
const useClerkData = () => {

    const [ users,setUsers] = useState<UserProp[]>([]);
    const [data,setData] = useState([]);
    useEffect(()=>{

        const getData = async () =>{
            debugger;
            const date = new Date();
            const result = await GetShippingData(date);
        }

      getData()

    },[]);

    useEffect(()=>{
        const handleValue = (snapshot:any) =>{
            debugger;
            const val = snapshot.val()||{};

            debugger;
        }

        clerksRef.on('value',handleValue);

        return () => {
            clerksRef.off('value',handleValue)
        }


    });

    return {
        users

    }
}

export { useClerkData}