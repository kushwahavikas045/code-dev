import React from 'react'
import BreadcrumbComp from '../../components/Breadcrumb';
import Grid from '../../components/Grid';
import { Avatar, Progress } from 'antd';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    


    return (
        <div>
            <BreadcrumbComp title3="Dashboard"/>
            <Grid>
        
            <div className="ui cards" style={{marginTop:'10%'}}>
            <div className="ui card">
                <div className="content">
                    <div className="center aligned header">
                    <Avatar shape="square" size={100} src="/images/profile.png"/>
                    </div>
                    <div className="center aligned description">
                    <p>Add Status, Github, Social Links</p>
                    </div>
                </div>
                <div className="extra content">
                <Link to="/profile"><div className="center aligned author" style={{cursor:'pointer', color:'black'}}>
                   Add Profile 
                    </div></Link>
                </div>
                </div>
                <div className="ui card">
                <div className="content">
                    <div className="center aligned header">
                    <Avatar shape="square" size={100} src="/images/education.png"/>
                    </div>
                    <div className="center aligned description">
                    <p>Add Degree and Qualification</p>
                    </div>
                </div>
                <div className="extra content">
                <Link to="/education"><div className="center aligned author" style={{cursor:'pointer', color:'black'}}>
                    Add Education
                    </div></Link>
                </div>
                </div>
            </div>    
            
            </Grid>
        </div>
    )
}

export default Dashboard;
