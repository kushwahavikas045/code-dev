import React,{useState, useEffect} from 'react'
import BreadcrumbComp from '../../components/Breadcrumb';
import {Link} from 'react-router-dom';
import {allProfiles} from '../../http/index';
import SearchFliter from '../Forms/SearchFliter';
const Profiles = () => {

    const[profiles, setProfiles] = useState([]);
    const[loading, setLoading] = useState(true);
    const[keyword, setKeyword] = useState("");
  
    const fetchProfile = async() =>{
        const{data} = await allProfiles();
          setProfiles(data);
          setLoading(false);
         
    }

    console.log(profiles);

    useEffect(() =>{
        fetchProfile();
    },[]);

    if(loading) return <p style={{position:'absolute', top:'50%', left:'45%'}}>Loading, please wait...</p>
     
   

   const searched = (keyword) => (profile) => profile.user.name.toLowerCase().includes(keyword) || profile.status.toLowerCase().includes(keyword);

    return (
       <>
       <BreadcrumbComp title3 = "Profiles"/>
       <SearchFliter keyword={keyword} setKeyword={setKeyword}/>
       <div className="ui cards" style={{margin:'20px 20px'}}>
     {!profiles ?  ('no profile found'): profiles.filter(searched(keyword)).map((profile) =>(
         
         <div className="card" key={profile._id}>
         <div className="content">
           <img className="right floated mini ui image" src={profile && profile.user.avatar} alt="profile"/>
           <div className="header">
             {profile.user.name}
           </div>
           <div className="meta">
             {profile.status}
           </div>
           <div className="description">
             <p><b>location:</b>  {profile.location}</p>
             <p><b>Github:</b>  {profile.github}</p> 
           </div>
         </div>
         <div className="extra content">
           <div className="ui two buttons">
             <Link to={`/user/profile/${profile.user._id}`}><div className="ui basic red button">Read More</div></Link>
           </div>
         </div>
       </div>
       
     ))}
</div>
       </>
    )
}

export default Profiles;
