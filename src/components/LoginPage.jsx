import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./styles/LoginPage.css";

export default function Login() {

  const [user, setUser] = useState({
    emailId: "",

    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const changeHandle = (e) => {
    setUser((oldUser) => ({
      ...oldUser,

      [e.target.name]: e.target.value,
    }));
  };
  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!user.emailId || !emailRegex.test(user.emailId)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Please enter a valid email address.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "",
      }));
    }

    if (!user.password || user.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Password must be at least 8 characters.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "",
      }));
    }

    return isValid;
  };


  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(user);
    axios
    .post("http://localhost:8083/user/login", user)
    .then((response) => {
      const userData = response.data; // Assuming the response data is an object containing the user data
      
  
      // Store the user data in localStorage after serializing it
      localStorage.setItem("userData", JSON.stringify(userData));
      // Store the user's ID separately
      localStorage.setItem("userName", userData.userName);
      localStorage.setItem("id", userData.userEmail);
  
      console.log("Response data:", userData); // Check the entire response data
      const role = userData.role; // Access the role from the response data
      console.log("Role: ", role); // Verify the role
  
      if (role === "ROLE_BUYER") {
        navigate("/buyer");
      } else if (role === "ROLE_SELLER") {
        navigate("/seller");
      } else {
        navigate("/");
      }
  
      alert("*****Login Successful*****");
    })
    .catch((error) => {
      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("An error occurred while making the request.");
      }
    });
  
}

    
  

  };

  return (
    <div className="containers">
      <div className="form-containers">
        {/* <div className="forms-images">
         
        </div> */}

        <div className="forms">
          <h2>Login Account</h2>

          <form className="mt-5" onSubmit={submitHandler}>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-forms-label">
                {" "}
                Username{" "}
              </label>

              <div className="col-sm-10">
                <input
                  type="email"
                  onChange={changeHandle}
                  name="emailId"
                  value={user.emailId}
                  placeholder="name@example.com"
                  className="forms-control"
                  id="inputEmail3"
                  required
                />
                <span className="error-message">{errors.emailError}</span>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-forms-label"
              >
                Password
              </label>

              <div className="col-sm-10">
                <input
                  type="password"
                  onChange={changeHandle}
                  name="password"
                  value={user.password}
                  placeholder="8 Alpha-Numeric Character"
                  className="forms-control"
                  id="inputPassword3"
                  required
                />
                <span className="error-message">{errors.passwordError}</span>
              </div>
            </div>

            <div className="text-centers">
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>

            <div className="text-centers mt-5">
              {" "}
              New here? <Link to="/register">Click to Register!</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
