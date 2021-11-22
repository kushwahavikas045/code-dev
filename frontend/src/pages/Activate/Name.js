import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setName} from '../../store/activateSlice';
import Input from '../../components/Input/Input';
import Index from '../../components/Button/Index';
const Name = ({onNext}) => {
    //redux
    const dispatch = useDispatch();
    const{name} = useSelector((state) => state.activate);
    const[username, setUsername] = useState(name);
    const[loading, setLoading] = useState(false);

    function submit(e){
      setLoading(true);
      e.preventDefault();
      dispatch(setName(username));
      setLoading(false);
      onNext();
    }

    return (
        <form className="ui form" style={{marginTop:'5%'}}>
        <div className="field">
          <label>Username: </label>
          <Input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <Index onClick = {submit} type="primary" text="Next" loading={loading}/>
      </form>
    )
}

export default Name;
