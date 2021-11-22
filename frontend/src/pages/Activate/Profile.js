import React,{useState} from 'react'
import Name from './Name'
import Avatar from './Avatar';
import Grid from '../../components/Grid';
import CompStep from '../../components/CompStep';
const Steps = {
    0: Name,
    1: Avatar,
}

const Profile = () => {
    const[currentStep, setCurrentStep] = useState(0);

    const Step = Steps[currentStep];

    function onNext(){
        setCurrentStep(currentStep + 1);
    }
    return (
        <Grid>
            <CompStep title1="Username:" title2 = 'Profile Photo:' current={currentStep}/>
            <Step onNext = {onNext}/>
        </Grid>
    )
}

export default Profile;
