// import React, { useContext, useEffect, useState } from 'react'
// import { toast } from 'react-hot-toast'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from './Context/AuthContext.jsx'

// const Register = () => {
//     const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer", number: "" })

//     const { state } = useContext(AuthContext)
//     const router = useNavigate()

//     const handleChange = (event) => {
//         setUserData({ ...userData, [event.target.name]: event.target.value })
//     }
//     const handleChangeForSelect = (event) => {
//         setUserData({ ...userData, "role": event.target.value })
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (userData.name && userData.email && userData.password && userData.confirmPassword && userData.role && userData.number) {
//             if (userData.password === userData.confirmPassword) {
//                 const response = await axios.post("/register",{ userData });
//                 if (response.data.success) {
//                     setUserData({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer", number: "" })
//                     router('/login')
//                     toast.success(response.data.message)
//                 } else {
//                     toast.error(response.data.message)
//                 }

//             } else {
//                 toast.error("Password and Confirm Password not Matched.")
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
//             <h1>Register</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>Name</label><br />
//                 <input type='text' onChange={handleChange} name='name' value={userData.name} /><br />
//                 <label>Email</label><br />
//                 <input type='email' onChange={handleChange} name='email' value={userData.email} /><br />
//                 <label>Contact Number</label><br />
//                 <input type='number' onChange={handleChange} name='number' value={userData.number} /><br />
//                 <label>Role</label><br />
//                 <select onChange={handleChangeForSelect} >
//                     <option value="Buyer">Buyer</option>
//                     <option value="Seller">Seller</option>
//                 </select><br />
//                 <label>Password</label><br />
//                 <input type='password' onChange={handleChange} name='password' value={userData.password} /><br />
//                 <label>Confirm Password</label><br />
//                 <input type='password' onChange={handleChange} name='confirmPassword' value={userData.confirmPassword} /><br />
//                 <input type='submit' value='Register' /><br />
//             </form>
//             <button onClick={() => router('/login')}>Login</button>
//         </div>
//     )
// }

// export default Register


import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from './Context/AuthContext.jsx'
import api from "./ApiConfig/index.js";



// import axios from "axios";

const Register = () => {
  const { state } = useContext(AuthContext);
  const navigateTo = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    role: "Buyer",
  });

  useEffect(() => {
    if (state?.currentUser?.name) {
      navigateTo("/");
    }
  }, [state, navigateTo]);

  const handleChangeValues = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      userData.name &&
      userData.email &&
      userData.number &&
      userData.password &&
      userData.confirmPassword &&
      userData.role
    ) {
      if (userData.password == userData.confirmPassword) {
        try {
          const response = await api.post("/register", {
            userData,
          });
          // const response = await axios.post("http://localhost:8002/register", {
          //   userData,
          // });

          if (response.data.success) {
            setUserData({
              name: "",
              email: "",
              number: "",
              password: "",
              confirmPassword: "",
              role: "Buyer",
            });
            toast.success(response.data.message);
            navigateTo("/login");
            // console.log(response.data);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Password and Confirm password does not match!");
      }
    } else {
      toast.error("Please fill all the fields!");
    }
  };

  return (
    <div id="register-screen">
      <form onSubmit={handleRegisterSubmit}>
        <div id="register-header">
          <h2>Register</h2>
        </div>
        <div className="fields">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChangeValues}
          />
        </div>
        <div className="fields">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChangeValues}
          />
        </div>
        <div className="fields">
          <label>Contact Number:</label>
          <input
            type="number"
            name="number"
            value={userData.number}
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
        <div className="fields">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChangeValues}
          />
        </div>
        <div className="roles">
          <select
            name="role"
            value={userData.role}
            onChange={handleChangeValues}
          >
            <option>Buyer</option>
            <option>Seller</option>
          </select>
        </div>
        <button type="submit">Register</button>
        <div>
          <p style={{ cursor: "pointer" }}>
            Already have an Account?{" "}
            <b onClick={() => navigateTo("/login")}>Login</b>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;