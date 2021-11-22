import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SearchFliter = ({keyword, setKeyword}) => {


    const handleSearchChange = (e) =>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
  }

  const fliterOptions = (value) => {
     setKeyword(value.toLowerCase());
     
  }

  
function onSearch(val) {
    
  }

 
    return (
        <div className="ui category search" style={{margin:'20px 20px', display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
  <div className="ui icon input" style={{width:'20%'}}>
    <input className="prompt" 
    type="text"  
    onChange={handleSearchChange} 
    placeholder="Search User"
    />
    <i className="search icon"></i>
  </div>

  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Fliter By Status"
    optionFilterProp="children"
    onChange={fliterOptions}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="inter">Inter</Option>
    <Option value="developer">Developer</Option>
    <Option value="devops">Dev ops</Option>
  </Select>
</div>
    )
}

export default React.memo(SearchFliter);
