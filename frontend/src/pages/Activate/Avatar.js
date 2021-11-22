import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Grid from '../../components/Grid';
import { activate } from '../../http';
import { setAvatar } from '../../store/activateSlice';
import { setAuth } from '../../store/authSlice';
const Avatar = () => {
    //local state
    const[image, setImage] = useState('/images/programmer.png');
    const [loading, setLoading] = useState(false);
   //redux stuf
   const  dispatch = useDispatch();
   const{name} = useSelector((state) => state.activate);
 
   function captureImage(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (){
        setImage(reader.result);
        dispatch(setAvatar(reader.result));
    }
   }
   
   const submit = async(e) => {
       e.preventDefault();
       setLoading(true);
     try {
         const {data} = await activate({name, image});
            dispatch(setAuth(data));

     } catch (error) {
         console.log(error);
     }finally{
        setLoading(false);
     }
    }
    
    
    if(loading) return <p>Activation in progress...</p>
    return (
        <Grid>
                <p className="subHeading">
                   Please, change this photo with your pic
                </p>
               <div className="avatarWrapper"style={{position:'relative', left:'50%', right:'50%', transform: 'translate(-50%, 10px)'}}>
               <img src={image} className="avatarImage" alt="monkey-profile"/>
               </div>

               <div style={{position:'relative', left:'50%', right:'50%', transform: 'translate(-50%, 10px)'}}>
                    <input
                         onChange={captureImage}
                        id="avatarInput"
                        type="file"
                        className="avatarInput"
                    />
                    <label className="avatarLabel" htmlFor="avatarInput">
                        Choose a different photo
                    </label>
                </div>

                <div>
                    <button className="ui primary button" onClick={submit}>Next</button>
                </div>
                </Grid>
    )
}

export default Avatar
