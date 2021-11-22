import React from 'react'
import { Steps } from 'antd';
const { Step } = Steps;
const CompStep = ({title1, description1,title2, description2, current}) => {

  const step = current || 0;
    return (
        <Steps current={step}
        style={{marginTop:'5%'}} >
        <Step title={title1} description={description1} />
        <Step title={title2} description={description2} />
      </Steps>
    )
}

export default React.memo(CompStep);
