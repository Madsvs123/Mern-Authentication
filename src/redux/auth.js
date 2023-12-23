import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    user : null,
    token : null,
    pageType : "login"
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setPageType : (state) => {
            state.pageType = state.pageType === "login" ? "register" : "login"
        },
        setLogin : (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogOut : (state, action) => {
            state.user = null
            state.token = null
        }
    }
})

export const { setPageType, setLogin, setLogOut } = authSlice.actions
export default authSlice.reducer
