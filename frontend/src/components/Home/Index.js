import React from 'react'
import Message from '../Result/Message';
import Grid from '../Grid';
const Index = () => {
    let content = [
        {id:1, item:'otp features'},
        {id:2, item:'Security otp send on email'}
    ];
    return (
       <Grid>
        <Message 
        type="success" 
        title="CodeDev"
        subtitle="developer connect with world"
        message = {content}
        />
       </Grid>
    )
}

export default Index;
