import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useParams } from 'react-router-dom';
import './ViewProduct.css'

const ViewProduct = () => {

    const {url, productID, getProductById, title_category, addToCart} = useContext(StoreContext)

    const {productId} = useParams();
    
    useEffect(() => {
        getProductById(productId); 
    }, [productId]);
    

  return (
    <div>
<div>
  {
    Array.isArray(productID) ? productID.map((item, index) => (
      <div key={index}>
        <div>
            <img src={`${url}/images/`+item.image} alt={item.title_product} />
        </div>
        <div>
            <div>
                <h2>Title</h2>
                <h2>{item.title_product}</h2>
            </div>
            <div>
                <h2>Description</h2>
                <p>{item.description}</p>
            </div>    
            <p><span>Price:</span> ${item.price}</p>
            <p><span>Category:</span> {title_category[item.category_id]}</p>
            <div className='product-info-button'>
                <button  onClick={() => addToCart(item._id)}>Add to cart</button>
            </div>   
        </div>
       
      </div>
    )) : productID ? (
      <div className='product-container'>
        <div className='product-img'>
            <img src={`${url}/images/`+productID.image} alt={productID.title_product} />
        </div>
        <div className='product-info'>
            <div className='product-info-title'>
                <p>Title: <span>{productID.title_product}</span></p>
            </div>
            <div className='product-info-description'>
                <h1>Description:</h1>
                <p>{productID.description}</p>
            </div>
            <p>Price:<span> ${productID.price}</span></p>
            <p>Category: <span>{title_category[productID.category_id]}</span></p>

            <div className='product-info-button'>
                <button  onClick={() => addToCart(productID._id)}>Add to cart</button>
            </div>    
        </div>
      </div>
    ) : <p>No product found</p>
  }
</div>


</div>

  )
}

export default ViewProduct
