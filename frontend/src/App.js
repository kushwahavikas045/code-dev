import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/Header';
import ProfileForm from './pages/Forms/ProfileForm';
import Register from './pages/Auth/Register';
import {useSelector}  from 'react-redux';
import Profile from './pages/Activate/Profile';
import Dashboard from './pages/user/Dashboard';
import {useAutoLogin} from './hooks/useAutoLogin';
import Profiles from './pages/user/Profiles';
import Myprofile from './pages/user/Myprofile';
import Singleprofile from './pages/user/Singleprofile';
import Account from './pages/user/Account';
import Hero from './components/Hero';
import EducationForm from './pages/Forms/EducationForm';
import Test from './components/Test';
import './App.css'

function App() {

  const{loading} = useAutoLogin();
  return loading ? (<div style={{position:'absolute', left:'50%', top:'45%'}} class="ui active centered inline loader"></div>): (
    <Router>
     <Header title="Code Dev" subtitle="Connect with developer"/>
     <Switch>
     <Route exact path='/'>
         <Hero/>
         </Route>
        
       <Route path='/view-developer-profile'>
         <Profiles/>
         </Route>
         <Route path='/user/profile/:id'>
         <Singleprofile/>
         </Route>
     <GuestRoute path='/register'>
       <Register/>
     </GuestRoute>
     <SemiProtectedRoute path="/activate">
       <Profile/>
     </SemiProtectedRoute>
     <ProtectedRoute path="/dashboard">
       <Dashboard/>
     </ProtectedRoute>
     <ProtectedRoute path="/profile">
       <ProfileForm/>
     </ProtectedRoute>
     <ProtectedRoute path="/My-profile">
       <Myprofile/>
     </ProtectedRoute>
     <ProtectedRoute path="/my-account">
       <Account/>
     </ProtectedRoute>
     <ProtectedRoute path="/education">
       <EducationForm/>
     </ProtectedRoute>

     </Switch>
    </Router>
  )
}

export default App;

//route access
const GuestRoute = ({children, ...rest}) =>{
 const{isAuth} = useSelector((state) => state.auth);
  return(
    <Route
    {...rest}
    render = {({location}) =>{
      return isAuth ? (
        <Redirect
         to={{
           pathname:'/dashboard',
           state : {from: location}
         }}
        />
      ):(
        children
      )
    }}
    >
 </Route>
  )
}

const SemiProtectedRoute = ({children, ...rest}) =>{
  const{isAuth, user} = useSelector((state) => state.auth);
return (
  <Route
  {...rest}
  render = {({location}) => {
    return !isAuth ? (
      <Redirect
      to={{
        pathname:'/register',
        state:{from: location}
      }}
      />
    ) : isAuth && !user.activated ? (
        children
    ):(
      <Redirect
      to={{
        pathname:'/dashboard',
        state:{from: location}
      }}
       />
    ) 
  }}
  ></Route>
)
}



const ProtectedRoute = ({children, ...rest }) =>{
  const{isAuth, user} = useSelector((state) => state.auth);
  return (
    <Route
    {...rest}
    render = {({location}) =>{
      return !isAuth ? (
       <Redirect
       to={{
         pathname:'/register',
         state:{from: location}
       }}/>
      ): isAuth && !user.activated ? (
        <Redirect to={{
          pathname:'/activate',
          state:{from:location}
        }}
        />
      ):(children)
    }}
    >

    </Route> 
  )
}