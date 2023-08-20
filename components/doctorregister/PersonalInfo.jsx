import React from 'react';
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PersonalInfo = ({ values, setValues }) => {


    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    value={values.firstName}
                    onChange={(e) => setValues({ ...values, firstName: e.target.value })}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    ize="medium"
                    fullWidth
                    value={values.lastName}
                    onChange={(e) => setValues({ ...values, lastName: e.target.value })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="aadharNumber"
                    label="Aadhar Number"
                    variant="outlined"
                    ize="medium"
                    fullWidth
                    value={values.aadharNumber}
                    onChange={(e) => setValues({ ...values, aadharNumber: e.target.value })}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth ize="medium">
                    <InputLabel>Gender</InputLabel>
                    <Select
                        name="gender"
                        value={values.gender}
                        onChange={(e) => setValues({ ...values, gender: e.target.value })}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default PersonalInfo;
