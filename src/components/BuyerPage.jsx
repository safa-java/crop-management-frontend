import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/BuyerPage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import NavbarBuyer from "./NavbarBuyer";

const BuyerPage = () => {
  const userEmail = localStorage.getItem("id");

  const [selectedType, setSelectedType] = useState("All");
  const [cropData, setCropData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState(""); //to store search input
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [cartItem, setCartItem] = useState({ quantity: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Define the number of items to display per page
  const totalPages = Math.ceil(filteredCrops.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredCrops.length);
  const visibleCrops = filteredCrops.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/crops/allcrops"
        );
        console.log(response.data);
        setCropData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchCropData();
  }, []);
  const fetchCropsByType = async (cropType) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/crops/getCropByType/${cropType}`
      );
      setFilteredCrops(response.data);
    } catch (error) {
      console.error("Error fetching crops by type:", error);
    }
  };
  const filterCropsByName = (searchText) => {
    const filtered = cropData.filter((crop) =>
      crop.cropName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCrops(filtered);
  };

  // Handle dropdown selection
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedType(selectedType);

    if (selectedType === "All") {
      setFilteredCrops(cropData);
    } else {
      fetchCropsByType(selectedType);
    }
  };

  // Handle search bar input
  const handleSearch = (e) => {
    const searchText = e.target.value;
    setInput(searchText);

    if (searchText.trim() === "") {
      setFilteredCrops(cropData);
    } else {
      filterCropsByName(searchText);
    }
  };

  const handleOnClick = async (id) => {
    try {
      // console.log(cartItem.quantity);

      if (userEmail) {
        const response = await axios.post(
          `http://localhost:8082/cart/add/${id}/${userEmail}`,
          cartItem
        );
      } else {
        console.log("UserEmail not found in local storage.");
      }

      // console.log(response.data);

      alert("Item added to cart Successfully!!!");

      navigate("/buyer");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarBuyer />
      <h1
        style={{
          marginTop: "20px",
          color: "white",
          fontSize: "35px",
          font: "initial",
        }}
      >
        Savor the season's finest at your table!
      </h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for crops"
          value={input}
          onChange={(e) => handleSearch(e)}
        />
        <button>Search</button>
        <select value={selectedType} onChange={(e) => handleTypeChange(e)}>
          <option value="All">All</option>
          <option value="grain">Grain</option>
          <option value="fruit">Fruits</option>
          <option value="vegetables">Vegetables</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading crop data...</p>
      ) : (
        <div className="crop-cards">
          <div className="row">
            {visibleCrops.map((crop) => (
              <div key={crop.id} className="crop-card">
                <img src={crop.image} alt={crop.name} />
                <h3 style={{ color: "blue" }}>{crop.cropName}</h3>
                <p>
                  <b>₹{crop.pricePerKg}</b>/kg
                </p>
                <p style={{ fontSize: "15px", color: "grey" }}>
                  {crop.farmName}
                </p>
                <p>{crop.farmLocation}</p>
                <p>
                  <FontAwesomeIcon icon={faPhone} /> {crop.contact}
                </p>
                <button
                  className="cart-btn"
                  onClick={() => handleOnClick(crop.id)}
                >
                  Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="pagination">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BuyerPage;
