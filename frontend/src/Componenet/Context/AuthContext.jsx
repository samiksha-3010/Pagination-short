import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { toast } from 'react-hot-toast'
export const AuthContext = createContext();

const initialState = { user: null };

const reducer= (state, action) =>{ 
    switch (action.type) {
        case "LOGIN":

        return {
            ...state,
            user: action.payload,
          };
         
        case "LOGOUT":
            localStorage.removeItem("token")
            toast.success("Logout success.")
            return {...state,user:null } 
        default:
            return state;
    }  
}
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // console.log(state)

    useEffect(() => {
        async function getCurrentUserData() {
            var token = JSON.parse(localStorage.getItem("token"));
            if (token) {

              try {
                const response = await axios.post("/get-current-user", { token });
                if (response.data.success) {
                    dispatch({
                        type: "LOGIN",
                        payload: response.data.user
                    })
                } 
                
              } catch (error) {
                console.log(error)
                
              }
            }
        }
        getCurrentUserData();
    }, [])
    return (
        <AuthContext.Provider value={{ state, dispatch }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;