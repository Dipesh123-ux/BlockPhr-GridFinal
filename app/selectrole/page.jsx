"use client"
import Choice from "@/components/Choice/page";
import React, { useContext } from "react";
import AuthContext from "@/context/authContext";
import { postAddress } from "@/apis/address";
import { useRouter } from "next/navigation";

const SelectRolePage = () => {

  const { user } = useContext(AuthContext);
  const router = useRouter();

  const DoctorRegistrationPage = async () => {
    try {
      router.push('/doctorregister')
    }
    catch (err) {
      console.log(err)
    }

  }

  const PatientRegistrationPage = async () => {
    try {
      router.push('/patientregister')
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <Choice DoctorRegister={DoctorRegistrationPage} PatientRegister={PatientRegistrationPage} />
  );
};

export default SelectRolePage;

