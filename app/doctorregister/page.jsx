"use client"
import { useState, useContext } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Button
} from '@mui/material';
import AuthContext from '@/context/authContext';
import PersonalInfo from '@/components/doctorregister/PersonalInfo';
import { postDoctor } from '@/apis/address';
import { useRouter } from 'next/navigation';

const steps = ['Personal Details'];

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { user,setUserDetails } = useContext(AuthContext);

  const router = useRouter();

  const [values, setValues] = useState({
    doctorAddress: user,
    firstName: '',
    lastName: '',
    aadharNumber: '',
    gender: 0,
  })


  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log('last step');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  }

  const formContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfo values={values} setValues={setValues} />;
      default:
        return <div>404: Not Found</div>
    }
  };

  const handleSubmit = async () =>{
    try{

      const res = await postDoctor(values.firstName + " " + values.lastName,user,values.gender,values.aadharNumber);
      if(res.message === "success"){
         setUserDetails(res.user);
         localStorage.setItem('userInfo',JSON.stringify(res.user));
         router.push('/doctordashboard')

      }
    }
    catch(err){

    }
  }

  return (
    <Box
      id="container"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',// Center the component vertically
      }}
    >
      <Box
        sx={{
          maxWidth: '700px',
          padding: 6,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          background : 'white',
          borderRadius : '10px'
        }}
      >
        <Stepper
          activeStep={activeStep}
          orientation="horizontal"
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ padding: '20px',paddingTop: '40px',paddingBottom: '40px' }}
          >
            {formContent(activeStep)}
          </Grid>
          {/* {formik.errors.submit && (
          <Grid
            item
            xs={12}
          >
            <FormHelperText error>
              {formik.errors.submit}
            </FormHelperText>
          </Grid>
        )} */}
          <Grid
            item
            xs={16}
            sx={{
              textAlign:"center",
            }}
          >
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} variant='outlined'>
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} variant='outlined'>
                Next
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Form;
