import React,{useState} from 'react';
import { verifyOtp } from '../../http';
import { setAuth } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Timer from 'otp-timer'
import Error from '../../components/Error';
import Input from '../../components/Input/Input';
import Index from '../../components/Button/Index';
const Otpverify = () => {
    const dispatch = useDispatch();
    const[otp, setOtp] = useState('');
    const[loading, setLoading] = useState(false); 

    //redux 
    const{hash, email} = useSelector((state) => state.auth.otp);
    const [error,  setError] = useState(null);
        //operation submit
    
   async function submit(e){
       try {
        e.preventDefault();
        setLoading(true);
        const {data} = await verifyOtp({otp, email, hash});
        dispatch(setAuth(data));
       } catch (error) {
         setError(error.response.data.message);
       } finally{
         setLoading(false);
       }
       
   }

    
    return (
        <form className="ui form">
          {error && <Error message={error}/>}
  <div className="field">
    <label>O.T.P: </label>
    <Timer seconds= {59} minutes={1} resend={submit}/>
    <Input type="text" name="otp" placeholder="otp" onChange={(e) => setOtp(e.target.value)}/>
  </div>
  <Index
  type="primary"
  loading={loading}
  text="Submit"
  onClick={submit}
  />
</form>
    )
}

export default Otpverify
