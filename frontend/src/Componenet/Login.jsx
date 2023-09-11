// import React, { useContext, useEffect, useState } from 'react'
// import { toast } from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from './Context/AuthContext'
// import axios from 'axios'


// const Login = () => {
//     const [userData, setUserData] = useState({ email: "", password: "" })

//     const { state, dispatch } = useContext(AuthContext)
//     const router = useNavigate()

//     const handleChange = (event) => {
//         setUserData({...userData, [event.target.name]: event.target.value })
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (userData.email && userData.password) {
//             try {
//                 const response = await axios.post("/login", { userData });
//                 if (response.data.success) {
//                     dispatch({
//                         type: 'LOGIN',
//                         payload: response.data.user
//                     })
//                     localStorage.setItem("token", JSON.stringify(response.data.token))
//                     setUserData({ email: "", password: "" })
//                     router('/')
//                     toast.success(response.data.message)
//                 }
//             } catch (error) {
//                 dispatch({
//                     type: 'LOGOUT'
//                 })
//                 console.log(error, "error from backend")
//                 toast.error(error.response.data.message)
//             }
//         } else {
//             toast.error("All fields are mandtory.")
//         }
//     }
//     // console.log(userData, "userData")

//     useEffect(() => {
//         if (state?.user?.name) {
//             router('/')
//         }
//     }, [state])

//     return (
//         <div>
//             <h1>Login</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>Email</label><br />
//                 <input type='email' onChange={handleChange} name='email' value={userData.email} /><br />
//                 <label>Password</label><br />
//                 <input type='password' onChange={handleChange} name='password' value={userData.password} /><br />
//                 <input type='submit' value='Login' /><br />
//             </form>
//             <p style={{ cursor: "pointer" }}>
//             Don't have an Account?{" "}
//             <b onClick={() => router("/register")}>Register</b>
//           </p>
//         </div>
//     )
// }

// export default Login


import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


import { AuthContext } from "./Context/AuthContext";
import api from "./ApiConfig";
// import axios from "axios";

const Login = () => {
  const { state, Login } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (state?.currentUser?.name) {
      navigateTo("/");
    }
  }, [state, navigateTo]);

  const handleChangeValues = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (userData.email && userData.password) {
      try {
        const response = await api.post("/login", { userData });
        // const response = await axios.post("http://localhost:8002/login", {
        //   userData,
        // });

        if (response.data.success) {
          Login(response.data);
          setUserData({ email: "", password: "" });
          toast.success(response.data.message);
          navigateTo("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please fill all the fields!");
    }
  };

  return (
    <div id="login-screen">
      <form onSubmit={handleLoginSubmit}>
        <div id="login-header">
          <h2>Login</h2>
        </div>
        <div className="fields">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChangeValues}
          />
        </div>
        <div className="fields">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChangeValues}
          />
        </div>
        <button type="submit">Login</button>
        <div>
          <p style={{ cursor: "pointer" }}>
            Don't have an Account?{" "}
            <b onClick={() => navigateTo("/register")}>Register</b>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;