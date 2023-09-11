// import React, { useContext } from 'react'
// import { AuthContext } from './Context/AuthContext'
// import { useNavigate } from 'react-router-dom'


// const Navbar = () => {
//   const {state,dispatch} = useContext(AuthContext)
//   const router = useNavigate();
//   return( 
//   <div style={{border:"1px solid black",display:"flex",justifyContent:"space-around",height:"70px"}}>
//   <div  style={{ width: "50%", display: 'flex', justifyContent: 'space-around' }}> 
//       <h4 onClick={() => router('/all-products')}>Logo</h4>
//       {state?.user?.role != "Seller" && <h4>Mens</h4>}
//       {state?.user?.role != "Seller" &&<h4>Womens</h4>}
//       {state?.user?.role != "Seller" && <h4>Kids</h4>}
//     {/* ***seller*** */}

//     {state?.user?.role == "Seller" &&<h4 onClick={() => router('/add-product')}>AddProduct</h4>}
//     {state?.user?.role == "Seller" && <h4 onClick={() => router('/your-product')}>YourProduct</h4>}
//   </div>
//   <div style={{ width: "20%", display: 'flex', justifyContent: 'space-around' }}>
//   {state?.user?.name ? <>
//       {state?.user?.role == "Buyer" && <h4 onClick={() => router('/add-cart')}>Cart</h4>}
//       <h4 onClick={() => router('/profile')}>Profile</h4>
//       <h4 onClick={() => dispatch({ type: "LOGOUT" })}>Logout</h4>
//      </>:<h4 onClick={() => router('/login')}>Login/Register</h4>}
//   </div>


// </div>

//   )
// }

// export default Navbar;


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";


const Navbar = () => {
  const { state, Logout } = useContext(AuthContext);
  const navigateTo = useNavigate();

  return (
    <div id="navbar">
      <div id="logo">
        <h2 onClick={() => navigateTo("/")}>LOGO</h2>
      </div>
      <div id="nav-items">
        {state?.currentUser?.role != "Seller" && (
          <>
            <h4>Mens</h4>
            <h4>Womens</h4>
            <h4>Kids</h4>
          </>
        )}

        {state?.currentUser?.role == "Seller" && (
          <>
            <h4 onClick={() => navigateTo("/add-product")}>Add Product</h4>
            <h4 onClick={() => navigateTo("/your-products")}>Your Products</h4>
          </>
        )}
      </div>
      <div id="nav-right">
        {state?.currentUser?.name ? (
          <>
            <p>
              Hi {state?.currentUser?.name?.toUpperCase()}(
              {state?.currentUser?.role})
            </p>
            <h4 onClick={() => navigateTo("/profile")}>Profile</h4>
            {state?.currentUser?.role == "Buyer" && (
              <h4 onClick={() => navigateTo("/cart-products")}>Cart</h4>
            )}
            <h4 onClick={Logout}>Logout</h4>
          </>
        ) : (
          <h4 onClick={() => navigateTo("/login")}>Register/Login</h4>
        )}
      </div>
    </div>
  );
};

export default Navbar;