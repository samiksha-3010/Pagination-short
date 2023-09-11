import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import axios from 'axios'


const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" })

    const { state, dispatch } = useContext(AuthContext)
    const router = useNavigate()

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password) {
            try {
                const response = await axios.post("/login", { userData });
                if (response.data.success) {
                    dispatch({
                        type: 'LOGIN',
                        payload: response.data.user
                    })
                    localStorage.setItem("token", JSON.stringify(response.data.token))
                    setUserData({ email: "", password: "" })
                    router('/')
                    toast.success(response.data.message)
                }
            } catch (error) {
                dispatch({
                    type: 'LOGOUT'
                })
                console.log(error, "error from backend")
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("All fields are mandtory.")
        }
    }
    // console.log(userData, "userData")

    useEffect(() => {
        if (state?.user?.name) {
            router('/')
        }
    }, [state])

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input type='email' onChange={handleChange} name='email' value={userData.email} /><br />
                <label>Password</label><br />
                <input type='password' onChange={handleChange} name='password' value={userData.password} /><br />
                <input type='submit' value='Login' /><br />
            </form>
            <p style={{ cursor: "pointer" }}>
            Don't have an Account?{" "}
            <b onClick={() => router("/register")}>Register</b>
          </p>
        </div>
    )
}

export default Login