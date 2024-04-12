import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/SellerPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarSeller from "./NavbarSeller";

const SellerPage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [cropData, setCropData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState(""); //to store search input
  const [filteredCrops, setFilteredCrops] = useState([]); // State to store filtered crops
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

  const deleteCrop = async (cropId) => {
    await axios.delete(`http://localhost:8081/crops/deleteCrop/${cropId}`);
    alert("Item deleted sucessfully!")

    navigate("/seller");
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

  return (
    <div>
      <NavbarSeller/>
      <h1 style={{ marginTop: "20px", color: "white", font: "initial" }}>
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
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e)}
        >
          <option value="All">All</option>
          <option value="grain">Grain</option>
          <option value="fruit">Fruits</option>
          <option value="vegetables">Vegetables</option>
        </select>
        <button id="btn-34"><Link to={'/addCrops'}>Add Crops</Link></button>
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
                <button id="update">
                  <Link to={`/updateCrop/${crop.id}`}>Update</Link>
                </button>
                <button id="del-btn" onClick={() => deleteCrop(crop.id)}>
                  Delete
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

export default SellerPage;
