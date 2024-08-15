import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavScrollExample from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/footer/Footer';
import Shop from './pages/Shop/Shop';
import Menu from './pages/Menu/Menu';
import ViewProduct from './pages/ViewProduct/ViewProduct';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { useEffect, useState } from 'react';
import Profile from './pages/Profile/Profile';

function App() {
  
  const [tokenUser, setTokenUser] = useState(localStorage.getItem("tokenUser"));
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    setTokenUser(token);
  }, [location]);


  return (
    <div className="App">

      <NavScrollExample />
     
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop/category/:category_id" element={<Menu />} />
        <Route path="/shop/product/:productId" element={<ViewProduct />} />
        
        {!tokenUser ? (
          <>
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<SignUp />} />
          </>
        ) : (
          <Route path="/profile" element={<Profile />} />
        )}
      </Routes>

      <Footer />
     
    </div>
  );
}

export default App;
