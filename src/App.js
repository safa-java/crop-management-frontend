import logo from './logo.svg';
import './App.css';
import BuyerPage from './components/BuyerPage';
import SellerPage from './components/SellerPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CartPage from './components/CartPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage';
import SellerAddCrop from './components/SellerAddCrop';
import SellerUpdateCrops from './components/SellerUpdateCrops'
import About from './components/About';
import Navbar from './components/NavbarSeller';
import UpdateProfile from './components/UpdateProfile';
import OrderDetailsPage from './components/OrderDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/register" element={<RegisterPage />}></Route>
          <Route exact path="/buyer" element={<BuyerPage />}></Route>
          <Route exact path="/cart" element={<CartPage />}></Route>
          <Route exact path="/seller" element={<SellerPage />}></Route>
          <Route exact path="/addCrops" element={<SellerAddCrop />}></Route>
          <Route exact path="/updateCrop/:id" element={<SellerUpdateCrops />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/navbar" element={<Navbar/>}></Route>
          <Route exact path="/userprofile" element={<UpdateProfile/>}></Route>
          <Route exact path="/order/getOrderById/:orderId" element={<OrderDetailsPage/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
