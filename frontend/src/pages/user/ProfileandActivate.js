import React from 'react';
import { Typography, Divider, Avatar } from 'antd';
import { Row, Col, Mentions, Button, Switch } from 'antd';
import { CopyOutlined} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {unactivate} from '../../http/index';
import { setAuth,setOtp } from '../../store/authSlice';
import {setAvatar, setName} from '../../store/activateSlice';
const { Title } = Typography;


const ProfileandActivate = ({profile}) => {
    const{name, avatar} = useSelector((state) => state.auth.user);

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
       <>
       <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Title level={5}>Security Profile</Title>
            <small>Customize your security name and <br/>url to share with vendores</small>
            </Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <div style={{ marginBottom: 10 }}>
              <Mentions style={{ width: '100%' }} placeholder={name} readOnly>
               </Mentions>
            </div>
              <Mentions style={{ width: '100%' }} placeholder={profile ? profile.website : ''} readOnly>
              </Mentions>
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              
            <Button type="ghost" icon={<CopyOutlined />} style={{marginBottom: 10}}>Click to Copy</Button>
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Title level={5}>Profile logo</Title>
            <small>Upload your profile logo and then <br/>choose where you want it to display</small>
            </Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
             <div style={{display:'flex'}}>
               <Avatar size={80} shape="square" src={avatar}/>

            </div> 
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              
            <Button type="ghost" style={{marginBottom: 10}}>Remove logo</Button>
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Title level={5}>Account Activated</Title>
            <small>Profile account activated and <br/>You can deactivated your account by swirch</small>
            </Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <div style={{ marginBottom: 10 }}>
              <Mentions style={{ width: '100%' }} placeholder={profile ? profile.date : 'activated data is not found'} readOnly>
               </Mentions>
            </div> 
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              
            <Switch defaultChecked onChange={onChange}/>
            </Col>
          </Row>
          

       </>
    )
}

export default React.memo(ProfileandActivate);
