import React, { useEffect, useState } from 'react'
import './Product.css'
import { useNavigate } from 'react-router-dom';
import AddProduct from '../../components/AddProduct/AddProduct';

const Product = ({ url }) => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [title_category, setTitle_category] = useState({});
  const [showModal, setShowModal] = useState(false);

  const fetchList = async () => {
    try {
      const res = await fetch(`${url}/api/product/getAllProducts`);
      const data = await res.json();
      setList(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategorybyId = async (id) => {
    try {
      const res = await fetch(`${url}/api/category/getCategoryId/${id}`);
      const data = await res.json();
      return data.data.title_category; // Return the category title
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const fetchCategoriesForProducts = async (products) => {
    const categoriesMap = {};
    for (const product of products) {
      const categoryTitle = await getCategorybyId(product.category_id);
      categoriesMap[product.category_id] = categoryTitle;
    }
    setTitle_category(categoriesMap);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchList();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      fetchCategoriesForProducts(list);
    }
  }, [list]);

  const handleplus = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleUpdateproduct = (productId)=>{
    console.log(productId)
    navigate('/admin/updateProduct/'+productId)
}

  const handleDeleteproduct = async (id) => {
    const res = await fetch(`${url}/api/product/deleteProduct/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    const data = await res.json();
    setList(list.filter(cat => cat._id!== id));
    if (data.success) {
      alert('Product deleted successfully');
    } else {
        alert('Error deleting Product');
    }
    fetchList()
    
  }

  return (
    <div className='list'>
      <p className='pr_title'>All Products List</p>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list && list.length > 0 ? list.map((item, index) => (
            <tr className="list-table-format" key={index}>
              <td><img src={`${url}/images/${item.image}`} alt="" /></td>
              <td>{item.title_product}</td>
              <td>{item.description}</td>
              <td>${item.price}</td>
              <td>{title_category[item.category_id] || "Loading..."}</td>
              <td className='cursor'>
                <button className='udabtn' onClick={()=>{handleUpdateproduct(item._id)}}>update</button> <br />
                <button className='delbtn'  onClick={()=>{handleDeleteproduct(item._id)}}>delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="6">No items</td></tr>
          )}
        </tbody>
      </table>

      {showModal && <AddProduct url={url} isVisible={showModal} onClose={() => setShowModal(false)} />}

      <div>
        <p className="plus" onClick={handleplus}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icon-tabler-outline icon-tabler-circle-plus">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
            </svg>
            </p>
      </div>
    </div>
  );
}

export default Product;
