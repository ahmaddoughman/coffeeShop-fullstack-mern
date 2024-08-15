import React, { useEffect, useState } from 'react'
import './AddProduct.css'

const AddProduct = ({isVisible, onClose, url }) => {
    const [image, setImage] = useState(false);
    const [title_product, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [titleCategory, setTitleCategory] = useState([]);
    const [message, setMessage] = useState('');

    const handleclose = (e) => {
        e.preventDefault();
        onClose();
    }

    const getCategory = async () =>{
        await fetch(`${url}/api/category/getCategory`)
        .then(res => res.json())
        .then(data => setTitleCategory(data.data))
        .catch(err => console.log(err))
    }
   
    useEffect(() => {
        getCategory();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Image:", image);
    console.log("Title:", title_product);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Category:", category);
        
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title_product', title_product);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category_id', category);
    
        try {
          const res = await fetch(`${url}/api/product/addProduct`, {
            method: 'POST',
            body: formData,
          });
    
          const data = await res.json();
    
          if (data.success) {
            setMessage('Data inserted successfully!');
            setImage(false);
            setTitle('');
            setDescription('');
            setPrice('');
            setCategory('');
          } else {
            setMessage('Error inserting data: ' + data.message);
          }
        } catch (error) {
          console.error(error);
          setMessage('Error inserting data');
        }
      };
    

  if(isVisible){
    return (
        <div className="container">
            <div className="container2">
                <div className="main1">
                    <p className="close" onClick={handleclose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </p>
        
                    <h2 className="h2">Add Product</h2>
                    <form action="" onSubmit={handleSubmit} id="form">
                    
                        <div>
                            <input type="file"  onChange={(e)=>setImage(e.target.files[0])} 
                                className="fileInput" id="fileInput" name="image" required />
                        </div>
                    
                        <div className="title-input1">
                            <div >
                                <input type="text" placeholder="Title" value={title_product} onChange={(e) => setTitle(e.target.value)} 
                                    className='title1' name="title_product" required/>
                            </div>

                            <div >
                                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} 
                                    className='title1' name="description" required/>
                            </div>

                            <div>
                                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} 
                                    className='title1' name="price" required/>
                            </div>

                            <div >
                                    <select 
                                        name="category" 
                                        className='select'
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)} 
                                        required
                                    >
                                        <option value="" disabled>Select a category</option>
                                        {titleCategory.map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.title_category}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                        </div>
                        
        
                        <button type="submit" name="add-category" className="btnAdd">Add</button>
                    </form>
                    {message && <p className='message'>{message}</p>}
                </div>
            </div>
        </div>
      );
  }else {
    return <></>;
  }
}

export default AddProduct
