import * as yup from 'yup';
export const loginValidationSchema = yup.object().shape({

    email: yup
    .string()
    .email("Enter a valid email")
    .required("Email required"),
    password: yup
    .string()
    .trim()
    .min(6, ({min})=> "Min lenght 6 characters")
    .required("Password required")



})