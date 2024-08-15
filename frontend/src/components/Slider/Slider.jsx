import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import './Slider.css'
import image1 from '../../assets/8-buying-a-coffee-shop-barista-making-coffee.jpg'
import image2 from '../../assets/Coffee-1024x683.png'
import image3 from '../../assets/MSP_5783-scaled.png'

const Slider = () => {
  return (
    <Carousel className='carsousel'>
      <Carousel.Item interval={1000} className='carsousel-items'>
        <Image src={image1}  className='img'  alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500} className='carsousel-items'>
        <Image src={image2} className='img'  alt="First slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carsousel-items'>
        <Image src={image3}  className='img' alt="First slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Slider
