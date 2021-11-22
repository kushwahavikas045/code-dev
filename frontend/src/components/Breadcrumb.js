import React from 'react'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const BreadcrumbComp = ({title1, title2, title3}) => {
    return (
        <Breadcrumb style={{margin:'10px 20px'}}>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
     {title1 ?  <Link to={`/${title1}`}>{title1}</Link> : null}
    </Breadcrumb.Item>
    <Breadcrumb.Item>
    {title2 ?  <Link to={`/${title2}`}>{title2}</Link> : null}
    </Breadcrumb.Item>
    {title3 ? <Breadcrumb.Item>{title3}</Breadcrumb.Item>: null}
  </Breadcrumb>
    )
}

export default BreadcrumbComp
