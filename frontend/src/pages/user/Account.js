import React from 'react'
import Grid from '../../components/Grid'
import { Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {unactivate} from '../../http/index';
import { setAuth,setOtp } from '../../store/authSlice';
import {setAvatar, setName} from '../../store/activateSlice';
const Account = () => {
    const{user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
   async function onChange (checked) {
       try {
        if(checked === false){
            await unactivate();
            dispatch(setAuth({user: null}));
            dispatch(setOtp({email:'', hash:''}));
            dispatch(setAvatar({avatar: ''}));
            dispatch(setName({name:''}));
         }
       } catch (error) {
          console.log(error.message); 
       }
      }

    return (
        <Grid>
            <div className="ui card" style={{marginTop:'10%'}}>
  <div className="content">
    <div className="header">{user && user.name}</div>
  </div>
  <div className="content">
    <h4 className="ui sub header">{user && user.activated ? 'Account Activated' : 'Account Unactivated'}</h4>
    <div className="ui small feed">
      <div className="event">
        <div className="content">
          <div className="summary">
             <b>Email: </b> {user && user.email}
          </div>
        </div>
      </div>
      <div className="event">
        <div className="content">
          <div className="summary">
             <b>Account Activated On:</b> {user && user.createdAt}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="extra content">
  <b style={{color:'black'}}>Activated</b>{" "}<Switch defaultChecked onChange={onChange}/>
  </div>
</div>
        </Grid>
    )
}

export default Account

//
