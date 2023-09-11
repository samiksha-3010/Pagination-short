import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Home = () => {
  const {state} = useContext(AuthContext)
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [name, setname] = ("")

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("/all-products",{currentPage,name});
          // if (response.data.success)
        if (response.status === 200) {
          setAllProducts(response.data.products);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    getProducts();

  }, [currentPage,name]);

  // console.log(state?.user,"-user")
  
 const pageincrement = (event)=>{
  setname((prev) => prev + 1);
 }
 const Pagedecriment = (event)=>{
  if (currentPage > 1) {
    setcurrentPage(currentPage - 1);

 }
 }
  const handleChange = (event) => {
    setcurrentPage(event.target.value);
   

    
  };

  return (
    <div>   
    <h2>Home</h2>
    <p>All Products</p>
    <div>
      <input
        style={{
          height: "30px",
          width: "200px",
          border: "1px solid black",
        }}
        type="text"
        onChange={handleChange}
      />
         <div><h2></h2>{state?.user?.name}</div>
 

 {allProducts?.length ? (
   <div style={{ display: "flex", justifyContent: "space-around" ,flexWrap:"wrap"  }}>
     {" "}
     {allProducts.map((product) => (
       <div
         style={{
           border: "2px solid black",
           width: "210px",
           height: "350px",
         }}
         key={product._id}
       >
         <img
           style={{ width: "100%", height: "70%"}}
           src={product.image}
         />
         <h3>Name : {product.name}</h3>
         <h3>Price : {product.price}</h3>
       </div>
     ))}
   </div>
 ) : (
   <div>No Product Found...</div>
 )}


    </div>
    <button  onClick={pageincrement}>Next Page</button>
 <button onClick={Pagedecriment}>Previous Page</button>
  <select>
    <option>Ascending</option>
    <option>Decending</option>
  </select>

    </div>
  )
}

export default Home;