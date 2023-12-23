import { Button, Typography } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { setLogOut } from "../../redux/auth"

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log(user)
  return (
    <div>
      <div className="navbar">
        <Typography variant="h5" fontWeight={500}>
          {`${user.firstname} ${user.lastname}`}
        </Typography>
      <div>
        <Button variant="contained" onClick={() => dispatch(setLogOut())}>
          LogOut
        </Button>
      </div>
      </div>
    </div>
  )
}

export default Home