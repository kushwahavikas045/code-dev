import React from 'react'
import { Button } from 'antd';
const Index = ({type, text, onClick, loading}) =>  <Button onClick={onClick} type={type} loading={loading}>{text}</Button>

export default React.memo(Index);
