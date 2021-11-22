import {userProfile} from '../http'
export const progressbar = async() =>{
    let progress = 0;
   const {data} = await userProfile();
   if(data){
    progress = 50;
   }
   if(!data.education === []){
       progress = 100;
   }
   return progress;
}