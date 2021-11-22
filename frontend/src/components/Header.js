import React from 'react'
import { PageHeader, Button, Avatar, Menu, Dropdown} from 'antd';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { DownOutlined, LogoutOutlined, ProfileOutlined, UserSwitchOutlined, DashOutlined } from '@ant-design/icons';
import { logout } from '../http';
import { setAuth } from '../store/authSlice';
import { useDispatch } from 'react-redux';
const Header = ({title, subtitle}) => {
  //redux
  const history = useHistory();
  const{isAuth, user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const submit = async() =>{
     try {
      const {data} = await logout();
      history.push('/register');
      dispatch(setAuth(data));
     } catch (error) {
       console.log('error ---> ', error.message); 
     }
  }
  //menu
 
  const menu = (
    <Menu>
       <Menu.Item key="3" icon={<DashOutlined />}>
        <Link to='/dashboard'> Dashboard </Link>
      </Menu.Item>
      <Menu.Item key="1" icon={<ProfileOutlined />}>
        <Link to='/My-profile'> My profile </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserSwitchOutlined />}>
        <Link to='/my-account'> My Account </Link>
      </Menu.Item>
      <Menu.Item key="0" icon={<LogoutOutlined />} onClick={submit}>
          Logout
      </Menu.Item>
      
    </Menu>
  )  
  
  
    return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={title}
      subTitle={subtitle}
      extra={[
       isAuth && <Avatar src={user.avatar
        ? user.avatar
        : 'programmer.png'}/>,
       user ? (<Dropdown overlay={menu}>
         <span className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{cursor:'pointer'}}>
           {user.name} <DownOutlined />
         </span>
       </Dropdown>) : '',
      !isAuth && !user ?  (
      <>
      <Button key="1" type="primary">
      <Link to="/register"> Register </Link>
     </Button> 
     <Button key="1" type="primary">
        <Link to="/view-developer-profile"> Developer Profile </Link>
       </Button>
       </> ): <Button key="1" type="primary">
        <Link to="/view-developer-profile"> Developer Profile </Link>
       </Button>,
      ]}
    >
    </PageHeader>
    )
}

export default React.memo(Header);
