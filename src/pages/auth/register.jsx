import Submit from '../../Components/Submit'
import {Box, TextField, Button, Typography} from '@mui/material'
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const validationSchema = yup.object().shape({
  firstname : yup.string().max(30, "Invalid").required("Required Field"),
  lastname : yup.string().max(30, "Invalid").required("Required Field"),
  email : yup.string().email().required(),
  password : yup.string().required(),
  confirmPassword : yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const initialValues =  {
  firstname : "",
  lastname : "",
  email : "",
  password : "",
  confirmPassword : "",
}

const RegisterForm = () => {
  const navigate = useNavigate()

  const {values, errors, handleChange, handleSubmit, setFieldValue} = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async(values) => {
      const formData = new FormData()
      console.log('submitted')
      for (let value in values) {
        formData.append(value, values[value])
      }
      await axios.post("https://kaied-mern-authentication-api.onrender.com/auth/register", formData, {
        headers : { "Content-Type" : "application/x-www-form-urlencoded" }
      }).then(res => console.log(res)).catch(err => console.log(err))

      navigate('/')
    }
  })


  return (
    <Box>
        <form onSubmit={handleSubmit}>
        <Box display="grid" gridTemplateColumns={`repeat(2, minmax(0, 1fr))`} gap="1rem">
        <TextField fullWidth type="firstname"
                     name="firstname" 
                     values={values.firstname} 
                     onChange={handleChange} 
                     placeholder="First Name"
                     sx={{gridColumn : "span 1"}}
                     size='small'
          />
                  <TextField fullWidth type="lastname"
                     name="lastname" 
                     values={values.lastname} 
                     onChange={handleChange} 
                     placeholder="Last Name"
                     sx={{gridColumn : "span 1"}}
                     size='small'
          />
          <TextField fullWidth type="email"
                     name="email" 
                     values={values.email} 
                     onChange={handleChange} 
                     placeholder="Email"
                     sx={{gridColumn : "span 2"}}
                     size='small'
          />
          <TextField fullWidth type="password"
                     name="password" 
                     values={values.password} 
                     onChange={handleChange} 
                     placeholder="Password"
                     sx={{gridColumn : "span 2"}}
                     size='small'
          />
          <TextField fullWidth 
                     type="password"
                     name="confirmPassword" 
                     values={values.confirmPassword} 
                     onChange={handleChange} 
                     placeholder="Confirm Password"
                     sx={{gridColumn : "span 2"}}
                     size='small'
          />
          <Button fullWidth variant="contained" size="large" type='submit' sx={{gridColumn : "span 2"}}>
            SignUp
          </Button>
        </Box>
        </form>
    </Box>
  )
}

export default RegisterForm