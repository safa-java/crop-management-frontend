import React, { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import axios from "axios";

import "./styles/RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: "",
    userPassword: "",
    userEmail: "",
    mobileNumber: "",
    role: "",
    address: {
      city: "",
      pinCode: "",
      houseNumber: "",
      area: "",
      state: ""

      
    },
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];

      setFormData((prevFormData) => ({
        ...prevFormData,

        address: {
          ...prevFormData.address,

          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,

        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    const validationErrors = validateInputs();


    if (Object.keys(validationErrors).length === 0) {
      
      try {
        
    const response = axios.post(
      "http://localhost:8083/user/register",
      formData
    );

    console.log(response.data);
    alert("Registered Successfully");
    navigate("/register");
        

      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isValidMobileNumber(mobileNumber) {
    return /^\d{10}$/.test(mobileNumber);
  }
  const validateInputs = () => {
    const errors = {};

    if (!formData.userName) {
      errors.userName = "Full Name is required";
    }

    if (!formData.userPassword || formData.userPassword.length < 8) {
      errors.userPassword = "Password must be at least 8 characters";
    }

    if (!isValidEmail(formData.userEmail)) {
      errors.userEmail = "Invalid Email";
    }

    if (!isValidMobileNumber(formData.mobileNumber)) {
      errors.mobileNumber = "Invalid Mobile Number (10 digits)";
    }

    if (!formData.role) {
      errors.role = "Role is required";
    }

    if (!formData.address.state) {
      errors.address = {
        ...errors.address,
        state: "State is required",
      };
    }

    return errors;
  };

  return (
    <>
      <div>
        <div className="signup-card">
          <h2>Signup Form</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userName">Full Name:</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />
              {errors.userName && <div className="error">{errors.userName}</div>}

              <label htmlFor="userPassword">Password:</label>
              <input
                type="password"
                id="userPassword"
                name="userPassword"
                value={formData.userPassword}
                onChange={handleInputChange}
                required
              />
              {errors.userPassword && 
                <div className="error">{errors.userPassword}</div>
              }

              <label htmlFor="userEmail">Email:</label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                required
              />
              {errors.userEmail && (
                <div className="error">{errors.userEmail}</div>
              )}

              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="tell"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
              />
              {errors.mobileNumber && <div className="error">{errors.mobileNumber}</div>}


              <label htmlFor="houseNumber">Building/House Number:</label>
              <input
                type="text"
                id="houseNumber"
                name="address.houseNumber"
                value={formData.address.houseNumber}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="area">Area:</label>
              <input
                type="text"
                id="area"
                name="address.area"
                value={formData.address.area}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="pinCode">Pincode:</label>
              <input
                type="text"
                id="pinCode"
                name="address.pinCode"
                value={formData.address.pinCode}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                required
              />

              {errors.address && errors.address.state && (
                <div className="error">{errors.address.state}</div>
              )}
            </div>

            <div>
              <label htmlFor="role">Role:</label>

              <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
                <option value={""}>Select Option</option>

                <option value={"ROLE_SELLER"}>Seller</option>

                <option value={"ROLE_BUYER"}>Buyer</option>
              </select>
              {errors.role && <div className="error">{errors.role}</div>}

            </div>

            <div>
              <button type="submit">Sign Up</button>
            </div>
          </form>

          <p id="para" style={{fontStyle:"italic"}}>
            Already a user? <a href="/login">Click here to Login</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
