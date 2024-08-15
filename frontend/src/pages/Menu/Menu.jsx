import React, { useContext, useEffect } from 'react'
import './Menu.css'
import { useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Menu = () => {

    const navigate = useNavigate()

    const {url, filteredProducts, getProductByCategory, title_category, addToCart} = useContext(StoreContext)
  
    const {category_id} = useParams();

    useEffect(() => {
        getProductByCategory(category_id); // Fetch products by category ID
    }, [category_id, getProductByCategory]);


    const handleView = (e, productId) => {
        e.preventDefault()
        navigate(`/shop/product/${productId}`)
    }

  return (
    <div className='menu-container'>
        <h2 className='title-h2'>{title_category[category_id]}</h2>
        <hr className='title-hr' />
        <div className='shop-product-containers'>
            {filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((item,index) => {
                return (
                    <Card style={{ width: '18rem' }}  key={index}>
                        <Card.Img variant="top" style={{width:"286px", height:"220px"}} src={`${url}/images/`+item.image} />
                        <Card.Body>
                            <Card.Title>{item.title_product}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Card.Text>${item.price}</Card.Text>
                            <Button variant="success" style={{marginRight:"25px"}}  onClick={() => addToCart(item._id)}>Add to cart</Button>
                            <Button variant="info" onClick={(e) =>{handleView(e,item._id)}}>view product</Button>
                        </Card.Body>
                    </Card>
                );
            }): <p>No items available</p>}
        </div>
    </div>
  )
}

export default Menu
