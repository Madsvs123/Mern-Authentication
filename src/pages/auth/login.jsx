import Submit from '../../Components/Submit'
import {Box, TextField, Button, Checkbox, FormControlLabel, Typography} from '@mui/material'
import {useFormik} from 'formik'
import { useDispatch } from 'react-redux'
import { setLogin } from '../../redux/auth'
import * as yup from 'yup'
import axios from 'axios'

const validationSchema = yup.object().shape({
  email : yup.string().email().required(),
  password : yup.string().required()
})

const initialValues =  {
  email : "",
  password : ""
}

const LoginForm = () => {
  const dispatch = useDispatch()

  const {values, errors, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async(values) => {
      const data = JSON.stringify(values)
      await axios.post('https://kaied-mern-authentication-api.onrender.com/auth/login', data, {
        headers : { 'Content-Type': 'application/json'}
      }).then(res => 
        {
          const user = res.data.user;
          const token = res.data.token
          dispatch(setLogin({
            user,
            token
          }))
        })
      .catch(err => console.log(err))

    }
  })

  return (
    <Box>
        <form onSubmit={handleSubmit}>
        <Box display="grid" gridTemplateColumns={`repeat(2, minmax(0, 1fr))`} gap="1rem">
          <TextField type="email"
                     name="email" 
                     values={values.email} 
                     onChange={handleChange} 
                     placeholder="Email"
                     sx={{gridColumn : "span 2"}}
                     size='small'
          />
          <TextField type="password"
                     name="password" 
                     values={values.password} 
                     onChange={handleChange} 
                     placeholder="Password"
                     sx={{gridColumn : "span 2"}}
                     size='small'

          />
          <Button variant="contained" type='submit' sx={{gridColumn : "span 2"}}>
            Login
          </Button>
          </Box>
        </form>
    </Box>
  )
}

export default LoginForm