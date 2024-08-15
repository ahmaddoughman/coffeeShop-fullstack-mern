import React, { useContext, useEffect, useState } from 'react'
import './Shop.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Shop = () => {

    const {url, product, title_category, addToCart} = useContext(StoreContext)

    const navigate = useNavigate()

    const [category, setCategory] = useState([])

    const getCategory = async () =>{
        await fetch(`${url}/api/category/getCategory`)
        .then(res => res.json())
        .then(data => setCategory(data.data))
        .catch(err => console.log(err))
    }

    const handelCategory = (e, category_id) => {
        e.preventDefault()
        navigate(`/shop/category/${category_id}`)
    }

    useEffect(() => {
        getCategory()
    }, [])



  return (
    <div className='shop'>

      <div className='shop-category'>
        <h2 className='shop-category-h2'>Categories</h2>
        <div className='shop-category-container'>
            {category && category.length > 0 ? category.map((item,index) => {
                return (
                <div className='shop-category-item' key={index}>
                    <img src={`${url}/images/`+item.image} alt="" />
                    <p>{item.title_category}</p>
                    <button type='submit' onClick={(e)=>handelCategory(e,item._id)}>view menu </button>
                </div>
                );
            }): <p>No items available</p>}
        </div>
      </div>

      <div className='shop-product'>
        <h2 className='shop-product-h2'>Some Of Delicious Menu</h2>
        <div className='shop-product-container'>
            {product && product.length > 0 ? product.map((item,index) => {
                return (
                <div className='shop-product-item' key={index}>
                    <div>
                        <img src={`${url}/images/`+item.image} alt="" />
                        <p className='prod-title'>{item.title_product}</p>
                    </div>
                    <div>
                        <p>{item.description}</p>
                        <p>${item.price}</p>
                        <p>Category: {title_category[item.category_id]}</p>
                        <button type='submit'  onClick={() => addToCart(item._id)}>Add to cart</button>
                    </div>
                </div>
                );
            }): <p>No items available</p>}
        </div>
      </div>

    </div>
  )
}

export default Shop
