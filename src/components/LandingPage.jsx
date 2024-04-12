import React from "react";
import { Link } from "react-router-dom";

function LandingPage () { 
  const yourGif = "https://cdn.dribbble.com/users/5146/screenshots/932935/mycogen_1.gif";


  return(
    <div>
      
      <img src={yourGif} alt="A fun animated GIF" width="150" height="100" style={{marginTop:"60px", borderRadius:"30px"}} />
      <h2  style={{fontFamily:"cursive", color:"darkgreen"}}>Welcome to Farm Fresh</h2>
     
      

      

      <h1  style={{fontFamily:"cursive", color:"darkgreen"}}>Your source for fresh and local produce!!</h1>
      
      <div className="buttons">
        <button style={{backgroundColor:"lightcoral"}}><Link to={"/"}>Home</Link></button>
        <button style={{backgroundColor:"lightcoral"}}><Link to={'/about'}>About Us</Link></button>
        <button style={{backgroundColor:"lightcoral"}}><Link to={'/login'}>Login</Link></button>
      </div>
    </div>
    );
    }


export default LandingPage;
