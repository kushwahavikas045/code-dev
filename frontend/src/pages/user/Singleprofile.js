import React,{useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import BreadcrumbComp from '../../components/Breadcrumb';
import { Descriptions, Divider } from 'antd';

import api from '../../http/index';
const Singleprofile = () => {
    const[userProfile, setUserProfile] = useState('');
    const[loading, setLoading] = useState(true);
    console.log(userProfile);
    const {id} = useParams();
    const fetchProfile = async() =>{  
        const {data} = await api.get(`/api/profileById/${id}`);
        setLoading(false);
        setUserProfile(data);
    }

    useEffect(() =>{
        fetchProfile();
    },[]);



    if(loading) return <p style={{position:'absolute', top:'50%', left:'45%'}}>Loading, please wait...</p>
      
    return (
        <>
        <BreadcrumbComp title2="view-developer-profile" title3="Profile"/>
        
        <>
        <div style={{padding:'20px 20px'}}>
        <h2 className="ui header">
            <img src={userProfile.user ? userProfile.user.avatar : "/images/programmer.png"} style={{width:'150px', height:'150px'}} className="ui circular image" alt="user-image"/>
              {userProfile.user ? userProfile.user.name : ''}
            </h2>
        </div>
         
         {loading ? (<div style={{textAlign:'center'}}>loading, please wait...</div>) : (
             <>
            <Descriptions title="User Info" style={{padding:'20px 30px'}}>
            <Descriptions.Item label="Company">{userProfile ? userProfile.company : 'not Added yet.'}</Descriptions.Item>
            <Descriptions.Item label="Github">{userProfile ? userProfile.github : 'not Added yet.'}</Descriptions.Item>
            <Descriptions.Item label="LinkedIn">{userProfile ? userProfile.linkedin : 'not Added yet.'}</Descriptions.Item>
            <Descriptions.Item label="location">
            {userProfile ? userProfile.location : 'not Added yet.'}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
            {userProfile ? userProfile.status : 'not Added yet.'}  
            </Descriptions.Item>
            <Descriptions.Item label="Website">
            {userProfile ? userProfile.website : 'not Added yet.'}
            </Descriptions.Item>
            <Descriptions.Item label="Skills">
            {userProfile ? userProfile.skills.map((item) => <p key={item}>{item}</p>) : 'not Added yet.'}
            </Descriptions.Item>
        </Descriptions>
        <Divider/>

        {userProfile && userProfile.education.map((edu) => (
            <Descriptions title="Education Info" style={{padding:'20px 30px'}} key={edu._id}>
            <Descriptions.Item label="Collage">{edu ? edu.school : 'not added yet.' }</Descriptions.Item>
            <Descriptions.Item label="Field of study">{edu ? edu.fieldofstudy : 'not added yet' }</Descriptions.Item>
            <Descriptions.Item label="Degree">{edu ? edu.degree : 'not Added yet.'}</Descriptions.Item>
            <Descriptions.Item label="From">
            {edu ? edu.from : 'not Added yet.'}
            </Descriptions.Item>
            <Descriptions.Item label="To">
            {edu && edu.current ? 'current' : edu.to}  
            </Descriptions.Item>
        </Descriptions>
        ))}
        </>
        )}
        </>

    </>
        
    )
}

export default Singleprofile;
