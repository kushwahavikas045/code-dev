import React,{useState} from 'react';
import Grid from '../../components/Grid';
const Education = ({education}) => {
  const[educations] = useState(education);
  
  if(!education) return <p style={{position:'absolute', top:'50%', left:'45%'}}>NO, records found</p>

  const Education = educations.map((education) =>(
    <div className="ui card" style={{width: "100%", marginTop:'10%'}} key={education._id}>
  <div className="content">
    <div className="header">Your Education </div>
  </div>
  <div className="content">
    <h4 className="ui sub header">{education ? education.school : 'data not found'}</h4>
    <div className="ui small feed">
      <div className="event">
        <div className="content">
          <div className="summary">
             Degree : {education ? education.degree : 'data not found'}
          </div>
        </div>
      </div>
      <div className="event">
        <div className="content">
          <div className="summary">
             Field Of Study: {education ? education.fieldofstudy : 'data not found'}
          </div>
        </div>
      </div>
      <div className="event">
        <div className="content">
          <div className="summary">
             From: {education ?  education.from : 'data not found'} to {education && education.current ?  'current' : education.to }
          </div>
        </div>
    </div>
      </div>
  </div>
  <div className="extra content">
    <button className="ui button">Edit Education</button>
  </div>
</div>
  ))
    return (
        <Grid>
           {Education}
        </Grid>
    )
}

export default Education;
