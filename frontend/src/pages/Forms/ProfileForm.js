import React,{useState} from 'react'
import Grid from '../../components/Grid';
import { createProfile } from '../../http';
import BreadcrumbComp  from '../../components/Breadcrumb';
const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  github: '',
  linkedin: '',
 
};

const ProfileForm = () => {
  const [ formData, setFormData ] = useState(initialState);
  const [loading, setLoading] = useState('');
  const {
		company,
		website,
		location,
		status,
		skills,
		github,
		linkedin,
	
	} = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async(e) => {
    setLoading('loading');
		e.preventDefault();
		const {data} = await createProfile(formData);
    console.log(data);
    setFormData('');
    setLoading('');
	};

    return (
      <>
      <BreadcrumbComp title2 ="dashboard" title3 = "profile Form"/>
      <Grid>
      
            <form className={`ui ${loading} form`} onSubmit={onSubmit} style={{marginTop:'5%'}}>
  <h4 className="ui dividing header">Profile Information</h4>
  <div className="field">
    <div className="two fields">
     <div className="field">
      <label>Company Name:</label>
        <input type="text" name="company" value={company} placeholder="Abc solutions pvt ltd" onChange={onChange} />
      </div>
      
      <div className="field">
      <label>Website:</label>
        <input type="text" name="website" value={website} placeholder="https://abcsolutions.com" onChange={onChange} />
      </div>
    </div>
    <div className="two fields">
     <div className="field">
      <label>Status:</label>
        <input type="text" name="status" value={status} placeholder="(inter, developer, devops, data analysist, etc)" onChange={onChange} />
      </div>
      
      <div className="field">
      <label>Location:</label>
        <input type="text" name="location" value={location} placeholder="country, state" onChange={onChange} />
      </div>
    </div>
    <div className="two fields">
     <div className="field">
      <label>Github Link:</label>
        <input type="text" name="github" value={github} placeholder="https://github/kushwahavikas045" onChange={onChange} />
      </div>
      
      <div className="field">
      <label>Skills:</label>
        <input type="text" name="skills" value={skills} placeholder="HTML, CSS, JAVASCRIPT, NODEJS" onChange={onChange} />
      </div>
    </div>
  </div>
  <div className="field">
      <label>Linkedin:</label>
        <input type="text" name="linkedin" value={linkedin} placeholder="LinkedIn Id" onChange={onChange} />
      </div>
  <button className="ui button">Submit</button>
  </form>
        </Grid>
        </>
    )
}

export default ProfileForm;
