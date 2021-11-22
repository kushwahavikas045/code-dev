import React,{useState} from 'react';
import { sendOtp } from '../../http';
import { setOtp } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import Error from '../../components/Error';
import Input from '../../components/Input/Input'
import Index from '../../components/Button/Index';
const Emailverify = ({onNext}) => {
    const dispatch = useDispatch();
    const[email, setEmail] = useState('');
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null); 
    //operation submit
    
   async function submit(e){
       try {
        e.preventDefault();
        setLoading(true);
        const {data} = await sendOtp({email: email});
        setLoading(false);
        dispatch(setOtp({email: data.email, hash: data.hash}));
        onNext();
       } catch (error) {
         setError(error.response.data.message);
         setLoading(false);
       }
   }

    
   
    return (
        <form className="ui form">
         {error && <Error message={error} />}
  <div className="field">
    <label>Email: </label>
    <Input 
    type="email" 
    name="email" 
    placeholder="Email" 
    onChange={(e) => setEmail(e.target.value)}
    />
  </div>
 <Index 
 loading={loading}
 type="primary" 
 text="Next" 
 onClick={submit}
 />
</form>
    )
}

export default Emailverify
