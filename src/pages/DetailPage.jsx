import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice';
import { Carousel } from 'react-responsive-carousel';
import DetailPageHero from '../components/DetailpageHero';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../App.css';

const apiURL = 'https://js2-ecommerce-api.vercel.app/api/products';

const DetailPage = () => {
  console.log('DetailPage rendered');
//Gets the id from the url with useParams hook 
  const { _id } = useParams();
//State to store the product details
  const [product, setProduct] = useState(null);
//Dispatch hook to dispatch actions to redux store
  const dispatch = useDispatch();
  const [showBanner, setShowBanner] = useState(false);


  //Toggles the description
  const [showFullDescription, setShowFullDescription] = useState(false)
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }
//Shortens the description
  const getShortDescription = (description, wordLimit = 20) => {
    return description.split (" ").splice(0,wordLimit).join(" ") + "..."
  }
  
//Fetches product details from API
useEffect(() => {
  console.log('_id:', _id)


  const fetchData = async () => {
    try {
      const response = await fetch(`${apiURL}/${_id}`);
      const data = await response.json();
      console.log('Product Data:', data);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (_id) {
    fetchData();
  }

}, [_id]);



//Adds products to cart, dispatches the action addItem. Dispatch is a function of redux toolkit
//addItem tells the Redux store to add a new item to cart
//addItem ({..}) is the payload of the action. it contains the detail i want to add to the cart

const handleAddToCart = useCallback(() => {
  dispatch(addItem({
    _id: product._id,
    name: product.name,
    price: product.price,
    images: product.images,
  }));

  // Show the banner
  setShowBanner(true);

  // Hide the banner after 5 seconds
  setTimeout(() => {
    setShowBanner(false);
  }, 5000);
}, [dispatch, product]);

//If product details are not loaded, this will be shown
  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-grow text-primary" role="status">
        </div>
      </div>
    );
  }
//Console logs the index and direction of the carousel, logs information about the carousel
  const handleSelect = (index, direction) => {
    console.log(`Selected index: ${index}, direction: ${direction}`);
  };
//Renders the component with product details
  return (
    <div>
        <div style={{ position: 'relative' }}>
          {showBanner && (
            <div className='banner-container bg-dark p-3 text-light text-center' style={{ position: 'absolute', right: 0 }}>
              <p className='cart-banner'>Produkten har lagts till i kundvagnen!</p>
            </div>
          )}
       
          <DetailPageHero />
        </div>
      
      <div className='detailpage-container m-3'>
        <div className='detailpage-card'>
          <div className='carousel-container'>
            <Carousel
              infiniteLoop={true}
              renderArrowPrev={(onClickHandler, label) => (
                <button className='btn rounded position-absolute' type="button" onClick={onClickHandler} title={label.toString()} style={{ top: '50%', left: '0px', zIndex: 2 }}>                  
                <i className="bi bi-arrow-left"></i>
                </button>
              )}
              renderArrowNext={(onClickHandler, label) => (
                <button className='btn rounded position-absolute' type="button" onClick={onClickHandler} title={label.toString()} style={{ top: '50%', right: '0px', zIndex: 2 }}>
                  <i className="bi bi-arrow-right"></i>
                </button>
              )}
              onSelect={handleSelect}
              >
              {product.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`${product.name} - Image ${index + 1}`} style={{ height: 'auto', width: '100%' }} />
                </div>
              ))}
            </Carousel>
          </div>
            
            <div className='detailpage-content'>
              <h2 className='titel-product'>{product.name}</h2>
                <div>
                  {showFullDescription ? product.description : getShortDescription(product.description)}
                  {!showFullDescription && <button onClick={toggleDescription} className='read-more-btn border border-0 bg-transparent'>läs mer</button>}
                </div>
                
                <div className='d-flex align-items-left flex-column mt-4'>
                  <p className='price-btn mt-3'>{product.price}:-</p>
                  <button onClick={handleAddToCart} className="cart-btn btn btn-success">Lägg i kundvagn<i className="bi bi-cart ms-2"></i></button>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;