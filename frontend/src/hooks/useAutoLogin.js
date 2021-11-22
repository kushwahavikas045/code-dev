import {useEffect, useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/authSlice';

export const useAutoLogin = () =>{
    const[loading, setLoading] = useState(true);
     const dispatch = useDispatch();
    useEffect(() =>{
        (async() =>{
         try {
             const {data} = await axios.get('http://localhost:5500/api/refresh',
             {
                 withCredentials: true,
             });

             dispatch(setAuth(data));
             setLoading(false);
         } catch (error) {
             console.log(error.message);
             setLoading(false);
         }
        })();
    },[dispatch]);

    return {loading}
}