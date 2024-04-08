import axios, { AxiosError } from "axios";
import { RegisterFormType } from "../screens/RegisterScreen";
import apiInstance from "./api";
import { handleAxiosError } from "../utils/common";
import { CheckEmailType, LoginFormType } from "../screens/LoginScreen";


export const userRegister = async ({email,userName,password}:RegisterFormType) => {
   
  try {
      const response = await apiInstance.post('/users/register', {
      name: userName,
      email,
      password,
    });
  const data = response.data;
       return data;
  } catch (error) {
    handleAxiosError(error);
  }
 
}

export const userLogin = async ({email,password}:LoginFormType) => {
   
  try {
      const response = await apiInstance.post('/users/login', {
      email,
      password,
    });
  const data = response.data;
       return data;
  } catch (error) {
    handleAxiosError(error);
  }
 
}

export const checkIfUserExists = async ({email} : LoginFormType )=> {
  try {
    const response = await apiInstance.post('/users/checkUser', {
      email
    })
    return response.data
  } catch (error) {
    handleAxiosError(error);
  }
};
