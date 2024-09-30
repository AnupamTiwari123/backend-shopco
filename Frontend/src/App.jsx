import { useEffect, useState } from 'react';
import { getUserDetails } from './Services/apiServices';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Navbar from './Components/Navbar';
import Home from './Home';
import Cart from './Components/Cart/Cart';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Product from './Components/Product/Product';
import NewArrivals from './Components/NewArrivals/NewArrivals';
import Dashboard from './Components/Dashboard/Dashboard';
import ProductInfo from './Components/ProductInfo/ProductInfo';
import UserProfile from './Components/Profie/UserProfile';
import ProductByCategory from './Components/ProductByCategory/ProductByCategory';
import Orders from './Components/Orders/Orders';
import Footer from './Components/Footer/Footer';
import { UserProvider } from './Components/UserContext/UserContext';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserDetails();
        setUser(userData); 
      } catch (err) {
        setTimeout(() => {
          alert("Login to buy products", err);
        }, 3000);
      }
    };

    fetchUser(); 
  }, []);

  return (
    <UserProvider>
      <Router>
        <Elements stripe={stripePromise}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newarrivals" element={<NewArrivals />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/orders/:id" element={<Orders />} />
            <Route path="/cart" element={user ? <Cart user={user} /> : <Navigate to="/login" />} />
            <Route path="/products" element={<Product user={user} />} />
            <Route path="/products/productinfo/:id" element={<ProductInfo user={user} />} />
            <Route path="/products/:id" element={<ProductByCategory />} />
          </Routes>
          <Footer />
        </Elements>
      </Router>
    </UserProvider>
  );
};

export default App;
