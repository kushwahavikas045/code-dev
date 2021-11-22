import React,{useState} from 'react'
import Grid from '../../components/Grid';
import BreadcrumbComp  from '../../components/Breadcrumb';
import { Select } from 'antd';
import { addEducation } from '../../http';

const { Option } = Select;  

const initialState = {
  school: '',
  degree: '',
  fieldofstudy: '',
  from: '',
  to: '',
  current: false,
  descripation: '',
 
};

const EducationForm = () => {
  const [ formData, setFormData ] = useState(initialState);
  const [loading, setLoading] = useState('');
  const {
    school,
    from,
    to,
    current,
    descripation,
	} = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading('loading');
      const{data} = await addEducation(formData);
      setLoading('');
      console.log(data);
      console.log(formData);
    } catch (error) {
      console.log(error.message);
      setLoading('');
    }
	};

  //menu
  function onChangeSelect(value) {
    setFormData({...formData, degree: value});
  }
  
function onFieldofStudy(value){
  setFormData({...formData, fieldofstudy: value});
}
  
  function onSearch(val) {
    console.log('search:', val);
  }

    return (
      <>
      <BreadcrumbComp title2 ="dashboard" title3 = "Education form"/>
      <Grid>
      
    <form className={`ui ${loading} form`} onSubmit={onSubmit} style={{marginTop:'5%'}}>
    <h4 className="ui dividing header">Education Information</h4>
     <div className="field">
    <div className="two fields">
     <div className="field">
      <label>Collage Name:</label>
        <input type="text" name="school" value={school} placeholder="Collage Name" onChange={onChange} />
      </div>
      
      <div className="field">
      <label>Degree:</label>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a Degree"
        optionFilterProp="children"
        onChange={onChangeSelect}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="B-Tech">B-Tech</Option>
    <Option value="M-Tech">M-Tech</Option>
    <Option value="Bsc">Bsc</Option>
    <Option value="Others">Others</Option>
  </Select>
        {/* <input type="text" name="degree" value={degree} placeholder="Write your degree" onChange={onChange} /> */}
      </div>
    </div>
    <div className="two fields">
     <div className="field">
      <label>Fieldofstudy:</label>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a Degree"
        optionFilterProp="children"
        onChange={onFieldofStudy}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="Computer science">Computer science</Option>
    <Option value="Electronic Enginnering">Electronic Enginnering</Option>
    <Option value="Mechanical Enginnering">Mechanical Enginnering</Option>
    <Option value="Others">Others</Option>
  </Select>
        {/* <input type="text" name="fieldofstudy" value={fieldofstudy} placeholder="Write your branch of study" onChange={onChange} /> */}
      </div>
      
      <div className="field">
      <label>From:</label>
        <input type="date" name="from" value={from} placeholder="from" onChange={onChange} />
      </div>
     </div>
    <div className="two fields">
    <div className="field">
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => setFormData({ ...formData, current: !current })}
            />{' '}
            Current in collage
        </div>
      
      <div className="field">
      <label>To:</label>
        <input type="date" name="to" value={to} placeholder="to date" onChange={onChange} disabled={current} />
      </div>
    </div>
  </div>
  <div className="field">
      <label>descripation:</label>
        <input type="text" name="descripation" value={descripation} placeholder="write some descripation" onChange={onChange} />
      </div>
  <button onClick={onsubmit} className="ui button">Submit</button>
  </form>
        </Grid>
        </>
    )
}

export default EducationForm;
