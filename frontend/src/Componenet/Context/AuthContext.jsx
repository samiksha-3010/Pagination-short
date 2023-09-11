// import axios from "axios";
// import { createContext, useEffect, useReducer } from "react";
// import { toast } from 'react-hot-toast'
// export const AuthContext = createContext();

// const initialState = { user: null };

// const reducer= (state, action) =>{ 
//     switch (action.type) {
//         case "LOGIN":

//         return {
//             ...state,
//             user: action.payload,
//           };
         
//         case "LOGOUT":
//             localStorage.removeItem("token")
//             toast.success("Logout success.")
//             return {...state,user:null } 
//         default:
//             return state;
//     }  
// }
// const AuthProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);
//     // console.log(state)

//     useEffect(() => {
//         async function getCurrentUserData() {
//             var token = JSON.parse(localStorage.getItem("token"));
//             if (token) {

//               try {
//                 const response = await axios.post("/get-current-user", { token });
//                 if (response.data.success) {
//                     dispatch({
//                         type: "LOGIN",
//                         payload: response.data.user
//                     })
//                 } 
                
//               } catch (error) {
//                 console.log(error)
                
//               }
//             }
//         }
//         getCurrentUserData();
//     }, [])
//     return (
//         <AuthContext.Provider value={{ state, dispatch }} >
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthProvider;


import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-hot-toast";
import api from "../ApiConfig";

// import axios from "axios";

export const AuthContext = createContext();

const intialState = {
  currentUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  // console.log(state);

  const Login = (userData) => {
    // localStorage.setItem("current-user", JSON.stringify(userData.user));
    localStorage.setItem("Token", JSON.stringify(userData.token));

    dispatch({
      type: "LOGIN",
      payload: userData.user,
    });
  };

  const Logout = () => {
    localStorage.removeItem("Token");
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/get-current-user", { token });
          if (response.data.success) {
            dispatch({
              type: "LOGIN",
              payload: response.data.user,
            });
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          // dispatch({
          //   type: "LOGOUT",
          // });
          console.log(error);
        }
      }
    };

    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ state, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
