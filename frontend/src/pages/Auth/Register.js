//guest route
import React,{useState} from 'react'
import BreadcrumbComp from '../../components/Breadcrumb';
import CompStep from '../../components/CompStep';
import Grid from '../../components/Grid';
import Emailverify from '../Auth/Emailverify';
import Otpverify from '../Auth/Otpverify';

const step = {
    0: Emailverify,
    1: Otpverify
}

const Register = () => {
    const[currentStep, setCurrentStep] = useState(0);
    const Step = step[currentStep];
    
    function onNext(){
        setCurrentStep((prevState) => prevState + 1);
        
    }

    return (
        <>
        <BreadcrumbComp title3="register"/>
       <Grid>
         <CompStep
         title1 = 'Email verification'
         title2 = 'Otp verification'
         current = {currentStep}
         />
         <div style={{marginTop:'5%'}}>
             <Step onNext={onNext}/>
         </div>          
       </Grid>
       </>
    )
}

export default Register;

