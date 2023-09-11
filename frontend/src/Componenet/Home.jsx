// import React, { useContext, useEffect, useState } from 'react'
// import { AuthContext } from './Context/AuthContext';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const Home = () => {
//   const {state} = useContext(AuthContext)
//   const [allProducts, setAllProducts] = useState([]);
//   const [currentPage, setcurrentPage] = useState(1);
//   const [name, setname] = ("")

//   useEffect(() => {
//     async function getProducts() {
//       try {
//         const response = await axios.get("/all-products",{currentPage,name});
//           // if (response.data.success)
//         if (response.status === 200) {
//           setAllProducts(response.data.products);
//         }
//       } catch (error) {
//         console.log(error.response.data.message);
//       }
//     }
//     getProducts();

//   }, [currentPage,name]);

//   // console.log(state?.user,"-user")
  
//  const pageincrement = (event)=>{
//   setname((prev) => prev + 1);
//  }
//  const Pagedecriment = (event)=>{
//   if (currentPage > 1) {
//     setcurrentPage(currentPage - 1);

//  }
//  }
//   const handleChange = (event) => {
//     setcurrentPage(event.target.value);
   

    
//   };

//   return (
//     <div>   
//     <h2>Home</h2>
//     <p>All Products</p>
//     <div>
//       <input
//         style={{
//           height: "30px",
//           width: "200px",
//           border: "1px solid black",
//         }}
//         type="text"
//         onChange={handleChange}
//       />
//          <div><h2></h2>{state?.user?.name}</div>
 

//  {allProducts?.length ? (
//    <div style={{ display: "flex", justifyContent: "space-around" ,flexWrap:"wrap"  }}>
//      {" "}
//      {allProducts.map((product) => (
//        <div
//          style={{
//            border: "2px solid black",
//            width: "210px",
//            height: "350px",
//          }}
//          key={product._id}
//        >
//          <img
//            style={{ width: "100%", height: "70%"}}
//            src={product.image}
//          />
//          <h3>Name : {product.name}</h3>
//          <h3>Price : {product.price}</h3>
//        </div>
//      ))}
//    </div>
//  ) : (
//    <div>No Product Found...</div>
//  )}


//     </div>
//     <button  onClick={pageincrement}>Next Page</button>
//  <button onClick={Pagedecriment}>Previous Page</button>
//   <select>
//     <option>Ascending</option>
//     <option>Decending</option>
//   </select>

//     </div>
//   )
// }

// export default Home;




import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "./ApiConfig";

// import { toast } from "react-hot-toast";

const Home = () => {
  const navigateTo = useNavigate();
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [filterByDate, setFilterByDate] = useState({ filter: "1" });
  const [name, setName] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isProdExists, setIsProdExists] = useState("Loading...");
  console.log(isProdExists);
  // console.log(filterByDate);
  // console.log(name);

  console.log(page);

  const handleFilterChangeValue = (e) => {
    setFilterByDate({ [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setName(e.target.value);
    if (e.target.value) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  };

  const incrementPage = () => {
    setPage((prev) => prev + 1);
  };

  const decrementPage = () => {
    if (page == 1) {
      setPage(1);
    } else {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const getYourProducts = async () => {
      try {
        const response = await api.post("/all-products", {
          page,
          name,
          filterByDate,
        });
        // console.log(response.data);
        if (response.data.success) {
          setAllProducts(response.data.products);
        } else {
          setIsProdExists(response.data.message);
          // toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getYourProducts();
  }, [page, filterByDate, name]);

  return (
    <div id="home-screen">
      <div id="home">
        <h2>Home</h2>
        <p>All Products</p>
        <div>
          <div>
            <div>
              <input
                type="text"
                placeholder="Search Products"
                onChange={handleSearchChange}
              />
            </div>
            <div id="search-results" className={isSearch && "searchByName"}>
              {allProducts &&
                allProducts?.map((prod) => (
                  <>{isSearch && <p key={prod._id}>{prod.name}</p>}</>
                ))}
            </div>
          </div>
          <div>
            <h3>Filter:</h3>
            <select
              onChange={handleFilterChangeValue}
              name="filter"
              value={filterByDate.filter}
              defaultValue="1"
            >
              <option value="-1">Ascending</option>
              <option value="1">Descending</option>
            </select>
          </div>
        </div>
        <div id="products">
          {allProducts?.length ? (
            allProducts?.map((product) => (
              <div
                className="product"
                key={product._id}
                onClick={() => navigateTo(`/single-product/${product._id}`)}
              >
                <div className="image">
                  <img src={product.image} alt="product" />
                </div>
                <div className="details">
                  <h2>{product.name}</h2>
                  <h3>₹{product.price}</h3>
                  <p>{product.category}</p>
                </div>
              </div>
            ))
          ) : (
            <h2>{isProdExists}</h2>
          )}
        </div>
        <div className="page-button">
          <button onClick={decrementPage}>Previous Page</button>
          <button onClick={incrementPage}>Next Page</button>
        </div>
      </div>
    </div>
  );
};

export default Home;