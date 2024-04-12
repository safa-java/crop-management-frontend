import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/SellerAddCrop.css";
import { useNavigate, useParams, Link } from "react-router-dom";

function SellerAddCrop() {
  const [crop, setCrop] = useState({
    cropName: "",
    farmName: "",
    cropType: "",
    stockAvailable: 0,
    farmLocation: "",
    pricePerKg: 0,
    sellerName: "",
    contact: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/crops/getCropById/${id}`
        );

        setCrop(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCrop();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCrop((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:8081/crops/updateCrop/${id}`, crop);

      alert("Crop updated successfully");

      navigate("/seller");
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    let isValid = true;

    const errors = {};

    const nameRegex = /^[a-zA-Z\s]*$/;

    setErrors(errors);

    return isValid;
  };

  return (
    <>
      <div className="addcrop-card">
        <div className="add-crop">
          <h2>Update Crop</h2>

          <div>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="cropName">Crop Name:</label>

                <input
                  type="text"
                  id="cropName"
                  name="cropName"
                  value={crop.cropName}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />

                {errors.cropName && (
                  <span className="error">{errors.cropName}</span>
                )}
              </div>

              <div>
                <label htmlFor="cropType">Crop Type:</label>

                <input
                  type="text"
                  id="cropType"
                  name="cropType"
                  value={crop.cropType}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />

                {errors.cropType && (
                  <span className="error">{errors.cropType}</span>
                )}
              </div>

              <div>
                <label htmlFor="farmName">Farm Name:</label>

                <input
                  type="text"
                  id="farmName"
                  name="farmName"
                  value={crop.farmName}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />

                {errors.farmName && (
                  <span className="error">{errors.farmName}</span>
                )}
              </div>

              <div>
                <label htmlFor="pricePerKg">Price per unit(in Kgs):</label>

                <input
                  type="number"
                  id="pricePerKg"
                  name="pricePerKg"
                  value={crop.pricePerKg}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />

                {errors.pricePerKg && (
                  <span className="error">{errors.pricePerKg}</span>
                )}
              </div>

              <div>
                <label htmlFor="stockAvailable">Stock Available(in Kgs):</label>

                <input
                  type="number"
                  id="stockAvailable"
                  name="stockAvailable"
                  value={crop.stockAvailable}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />

                {errors.stockAvailable && (
                  <span className="error">{errors.stockAvailable}</span>
                )}
              </div>

              <div>
                <label htmlFor="image">Image Url:</label>

                <input
                  type="text"
                  id="image"
                  name="image"
                  value={crop.image}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />

                {errors.image && <span className="error">{errors.image}</span>}
              </div>

              <div>
                <label htmlFor="farmLocation">Farm Location:</label>

                <input
                  type="text"
                  id="farmLocation"
                  name="farmLocation"
                  value={crop.farmLocation}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />

                {errors.farmLocation && (
                  <span className="error">{errors.farmLocation}</span>
                )}
              </div>

              <div>
                <label htmlFor="contact">Seller Contact:</label>

                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={crop.contact}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />

                {errors.contact && (
                  <span className="error">{errors.contact}</span>
                )}
              </div>

              <div className="buttons-div">
                <button type="submit">
                Save & Update</button>

                <button
                  className="btn btn-secondary"
                  id="cancel-btn"
                  onClick={() => navigate("/seller")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerAddCrop;
