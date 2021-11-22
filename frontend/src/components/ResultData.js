import React from 'react'
import {Result} from 'antd';
const ResultData = ({title, subtitle}) => {
    return (
        <Result
            
            title={title}
            subTitle={subtitle}
           
          />
    )
}

export default React.memo(ResultData);
