import * as yup from 'yup';

const formSchema = yup.object().shape({
    first_name: yup
      .string()
      .trim()
      .required('Your first name is required!')
      .min(2, 'Your name isn\'t that short!'),
    last_name: yup
      .string()
      .trim()
      .required('Your last name is required!')
      .min(2, 'Your name isn\'t that short!'),
    email: yup
      .string()
      .email('Enter valid address!')
      .required('Email address required!'),
    password: yup
        .string()
        .trim()
        .required('Password is required!')
        .min(3, 'Choose a longer password!'),
    tos: yup
        .boolean()
        .oneOf([true], 'Must Accept TOS'),
  })
  
  export default formSchema;