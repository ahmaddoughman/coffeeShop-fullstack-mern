import React, { useEffect, useState } from 'react'
import './Category.css'
import Add from '../../components/Add/Add'
import { useNavigate } from 'react-router-dom'

const Category = ({url}) => {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState([])

    const getCategory = async () =>{
        await fetch(`${url}/api/category/getCategory`)
        .then(res => res.json())
        .then(data => setCategory(data.data))
        .catch(err => console.log(err))
    }

    console.log(category)


    const handleUpdateCategory = (id)=>{
        console.log(id)
        navigate('/admin/updateCategory/'+id)
    }

    const handleDeleteCategory = async (id) => {
      const res = await fetch(`${url}/api/category/deleteCategory/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      const data = await res.json();
      setCategory(category.filter(cat => cat._id!== id));
      if (data.success) {
        alert('category deleted successfully');
      } else {
          alert('Error deleting category');
      }
      getCategory()
      
    }
  


    useEffect(() => {
        getCategory()
    }, [])

    const handleplus = (e) =>{
        e.preventDefault();
        setShowModal(true)
      }
    

  return (
    <div>
      <h1 className='h1'>Category</h1>

      <div className="add-category">
        {category && category.length > 0 ? category.map((item,index) => {
            return (
                <div className='food-content' key={index}>
                <p id='editBtn' onClick={()=>{handleUpdateCategory(item._id)}}><i className='fa-solid fa-pen-to-square'></i></p>
                <p id='deleteBtn' onClick={()=>{handleDeleteCategory(item._id)}}><i className='fa-solid fa-circle-xmark'></i></p>
                <h2>{item.title_category}</h2>
                <div className='img-container'>
                    <img src={`${url}/images/`+item.image} alt="" />
                </div>
                </div>
            );
        })
         : <p>No items available</p>}
        
      </div>

      {showModal && <Add url={url} isVisible={showModal} onClose={() => setShowModal(false)} />}

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
  )
}

export default Category
