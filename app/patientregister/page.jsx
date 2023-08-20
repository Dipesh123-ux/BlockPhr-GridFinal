"use client"
import { useState, useContext } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Button,
  CircularProgress 
} from '@mui/material';
import AuthContext from '@/context/authContext';
import PersonalInfo from '@/components/Registration/PersonalInfo';
import Allergies from '@/components/Registration/Allergies';
import MedicineTracker from '@/components/Registration/CurrentMedication';
import useContract from '@/hooks/useBlock';
import { postAddress } from '@/apis/address';
import { useRouter } from 'next/navigation';


const steps = ['Personal Details', 'Allergies', 'Current Medications'];

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { userDetails,setUserDetails } = useContext(AuthContext);
  const [loading,setLoading] = useState(false);

  const contractInstance = useContract();

  // console.log(contractInstance._methods, "check-contract");

  const router = useRouter()

  const convertToUnixTimestamp = (normalDate) => {
    const dateObject = new Date(normalDate);
    const unixTimestamp = Math.floor(dateObject.getTime() / 1000); // Convert to seconds
    return unixTimestamp;
  };

  const [values, setValues] = useState({
    patientAddress: JSON.parse(localStorage.getItem('user')),
    firstName: '',
    lastName: '',
    dob: null,
    aadharNumber: '',
    gender: 0,
    weight: null,
    allergies: [],
    currentMedication: []
  })


  const updateAllergies = (newAllergies) => {
    setValues({
      ...values,
      allergies: newAllergies
    });
  };

  const updateCurrentMedication = (newMedication) => {
    setValues({
      ...values,
      currentMedication: newMedication
    });
  };


  const handleSubmit = async () => {
    setLoading(true);
    values.dob = convertToUnixTimestamp(values.dob);
    values.gender = values.gender === 'male' ? 0 : (values.gender === 'female' ? 1 : 0);
    console.log(contractInstance.methods)
    const res = await contractInstance.methods.registerPatient(values.firstName, values.lastName, values.dob, values.aadharNumber, values.gender, values.weight, values.allergies, values.currentMedication).send({ from: values.patientAddress })
    const response = await postAddress(values.firstName + " " + values.lastName, values.patientAddress, false,values.aadharNumber);
    setUserDetails(response.user);
    localStorage.setItem('userInfo', JSON.stringify(response.user));
    setLoading(false)
    if (res.blockHash) {
      router.push('/patientdashboard');
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

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
      case 1:
        return <Allergies selectedAllergies={values.allergies} updateSelectedAllergies={updateAllergies} />;
      case 2:
        return <MedicineTracker currentMedication={values.currentMedication} updateCurrentMedication={updateCurrentMedication} />;
      default:
        return <div>404: Not Found</div>
    }
  };

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
          background: 'white',
          borderRadius: '10px'
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
            sx={{ padding: '20px', paddingTop: '40px', paddingBottom: '40px' }}
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
              textAlign: "center",
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant='outlined'
              sx={{ marginRight: '10px' }}

            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} variant='outlined'>
               {loading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
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