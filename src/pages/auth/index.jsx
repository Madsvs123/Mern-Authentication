import React from 'react'
import LoginForm from './login'
import RegisterForm from './register'
import { Box, Typography, useMediaQuery, Button } from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'

const Auth = () => {
  const isNonMobileScreen = useMediaQuery("(min-width : 750px)")
  const [searchParams, setSearchParams] = useSearchParams()
  const isRegister = searchParams.get('page') === "register"

  return (
    <Box display="grid" gridTemplateColumns={isNonMobileScreen ? "repeat(2, minmax(0, 1fr))" : "100%"} height="100vh">
      <Box bgcolor="#CCC">
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
      <Box width="50%">
        <Typography variant="h3" align='center' fontWeight="700" m="1rem 0">
          {isRegister ? "Register" : "Login"}
        </Typography>
        {isRegister ? (
           <RegisterForm />
        ) : (
          <LoginForm />
        )}
      <Typography color="#666" fontSize=".8rem" mt=".5rem">
        {isRegister ? (
          <>
          Have An Account 
          <Link to="/" style={{textDecoration : "none", fontWeight : "bold", color: "red"}}>
            {" Login Now"}
            </Link>
          </>
        ) : (
          <>
            Don't Have An Account 
          <Link to="?page=register" style={{textDecoration : "none", fontWeight : "bold", color: "red"}}>
          {" Register Now"}
            </Link>
          </>
        )}
          </Typography>
      </Box>
      </Box>
    </Box>
  )
}

export default Auth