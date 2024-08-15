import React, { useEffect, useState } from 'react';
import './UpdateProduct.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = ({ url }) => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({});
    const [category, setCategory] = useState([]);
    const [image, setImage] = useState(null);
    const [title_product, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategoryId] = useState('');

    const getCategory = async () => {
        try {
            const res = await fetch(`${url}/api/category/getCategory`);
            const data = await res.json();
            setCategory(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getProduct = async () => {
        try {
            const res = await fetch(`${url}/api/product/getProductById/${productId}`);
            const data = await res.json();
            const productData = data.data;
            setProduct(productData);
            setImage(null); // Clear image file state
            setTitle(productData.title_product);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategoryId(productData.category_id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }
        formData.append('title_product', title_product);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category_id', category_id);

        try {
            const res = await fetch(`${url}/api/product/updateProduct/${productId}`, {
                method: 'PUT',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                alert('Product updated successfully');
                navigate('/products');
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            console.log(err);
            alert('Something went wrong');
        }
    };

    useEffect(() => {
        getCategory();
        getProduct();
    }, [productId]);

    return (
        <div>
            <div className="product-container">
                <h1>Update Product</h1>
                {product ? (
                    <div className="product-content">
                        <form className="product-form" onSubmit={handleUpdate} encType="multipart/form-data">
                            <div className='imgg1'> 
                                {product.image && !image ? (
                                    <img src={`${url}/images/` + product.image} alt="Product" />
                                ) : (
                                    image && <img src={URL.createObjectURL(image)} alt="Preview" />
                                )}
                                <input 
                                    type="file" 
                                    onChange={(e) => setImage(e.target.files[0])} 
                                    className="product-fileInput" 
                                    id="fileInput" 
                                    name="image" 
                                />
                            </div>

                            <input
                                type="text"
                                value={title_product}
                                onChange={(e) => setTitle(e.target.value)}
                                name="title_product"
                                placeholder="Title"
                                required
                            />
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                name="description"
                                placeholder="Description"
                                required
                            />
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                name="price"
                                placeholder="Price"
                                required
                            />

                            <div>
                                <select 
                                    name="category_id" 
                                    className='select'
                                    value={category_id} 
                                    onChange={(e) => setCategoryId(e.target.value)} 
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {category.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.title_category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button className="btnUpdate" type="submit">
                                Update
                            </button>
                        </form>
                    </div>
                ) : (
                    <h1>No Product Found</h1>
                )}
            </div>
        </div>
    );
};

export default UpdateProduct;
