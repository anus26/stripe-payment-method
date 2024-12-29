import React, { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const Home = () => {
  const cartItems = [
    {
      id: 1,
      name: "Laptop",
      quantity: 1,
      price: 999.99,
    },
    {
      id: 2,
      name: "Wireless Mouse",
      quantity: 2,
      price: 25.5,
    },
    {
      id: 3,
      name: "Keyboard",
      quantity: 1,
      price: 49.99,
    },
    {
      id: 4,
      name: "USB-C Cable",
      quantity: 3,
      price: 15.0,
    },
    {
      id: 5,
      name: "Headphones",
      quantity: 1,
      price: 199.99,
    },
  ];
  const [item,setItem]=useState([...cartItems])
  const payNow=async()=>{
    const stripe=await  loadStripe(
      "pk_test_51QZnGQIRj1yviCHVHU5BydOBDLLWb9JalokGV08iFReVjBpmqL4EtIPr7jXb50KxRYKs8z2wC4AW3M0eRTENnKR000909lbo2k"
    )
    const response=await axios.post("http://localhost:4000/api/v1/checkout",{
      products:item,
    })
    console.log(response.data.id);

    const result = stripe.redirectToCheckout({
      sessionId: response.data.id,

    });
  }

  
  return (
    <>
<div>
  {item.map((item,index)=>{
    return(
      <div style={{
        border:"1px solid black",
        borderRadius:"20px",
        gap:"20px",
        margin:"10px"
      }}
key={item.id}
      >
        <div style={{
          margin:"100px"
        }}><p>Name {item.name}</p>
      <p>Quantity {item.quantity}</p>
      <p>Id {item.id}</p>
      <p>Price {item.price}</p></div>
      </div>
     )
  })}
  <button onClick={payNow}>paynow</button>
</div>
    </>
  )
}

export default Home
