import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Category from './pages/Category/Category';
import UpdateCategory from './pages/UpdateCategory/UpdateCategory';
import Product from './pages/Products/Product';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import LoginAdmin from './pages/LoginAdmin/LoginAdmin';
import Home from './pages/Home/Home';
import { useEffect, useState } from 'react';
import Logout from './pages/Logout/Logout';
import Order from './pages/Orders/Order';

function App() {
  const url = "http://localhost:4000";
  const [tokenAdmin, setTokenAdmin] = useState(localStorage.getItem("tokenAdmin"));
  const location = useLocation();

  useEffect(() => {
    setTokenAdmin(localStorage.getItem("tokenAdmin"));
  }, [location]);

  return (
    <>
      <Routes>
          {!tokenAdmin ? (
            <>
              <Route path="*" element={<Navigate to="/admin/login" />} />
              <Route path="/admin/login" element={<LoginAdmin url={url} />} />
            </>
          ) : (
            <Route path="*" element={<AdminPanel url={url} />} />
          )}
      </Routes>
    </> 
  );
}

function AdminPanel({ url }) {

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="left">
        <h1 className="title" onClick={handleGoHome} style={{cursor:"pointer"}}>Admin Panel</h1>
        <Navbar />
      </div>

      <div className="right">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category url={url} />} />
          <Route path="/products" element={<Product url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
          <Route path="/users" element={<h1>users</h1>} />
          <Route path="/admin/updateCategory/:id" element={<UpdateCategory  url={url} />} />
          <Route path="/admin/updateProduct/:productId" element={<UpdateProduct  url={url} />} />
          <Route path="logout" element={<Logout />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
