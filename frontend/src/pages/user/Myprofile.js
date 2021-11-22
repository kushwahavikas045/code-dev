import React,{useState, useEffect} from 'react'
import BreadcrumbComp from '../../components/Breadcrumb';
import { userProfile } from '../../http';
import { Typography, Tabs} from 'antd';
import Education from './Education';
import ProfileandActivate from './ProfileandActivate';
import ResultData from '../../components/ResultData';
import { useDispatch } from 'react-redux';
import {setProgrssBar} from '../../store/activateSlice';
const { Title } = Typography;
const { TabPane } = Tabs;    
const Myprofile = () => {
    //redux
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); 
    const[profile, setProfile] = useState(''); 
    const fetchProfile = async() =>{
        const {data} = await userProfile();
        setProfile(data);
        setLoading(true);
         console.log(profile);
    }

    useEffect(() =>{
        fetchProfile();       
    },[]);


    function callback(key) {
      }

    //tabs
    const Demo = () => (
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Profile and activation" key="1">
            <ProfileandActivate profile = {profile ? profile : ''}/>
          </TabPane>
          <TabPane tab="Notification" key="3">
          <ResultData title="New version of CodeDev comming soon." subtitle={profile ?  `Your ID: ${profile.user}`: ''}/>
          </TabPane>
          <TabPane tab="Education" key="4">
            <Education education = {profile ? profile.education : ''}/>
          </TabPane>
          <TabPane tab="Experience" key="5">
          <ResultData title="Very soon we add experience functionality." subtitle={profile ?  `Your ID: ${profile.user}`: ''}/>
          </TabPane>
        </Tabs>
      );
        
    

    return (
        <>
            <BreadcrumbComp title2="dashboard" title3="My Profile"/>
            <div style={{padding:'20px 20px'}}>
            <Title level={5}>Account settings</Title>
             <Demo/>
            </div>

        </>
    )
}

export default Myprofile
