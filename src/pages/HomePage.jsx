import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Filtering from '../components/Filtering';
import Hero from '../components/Hero';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addItem } from '../slices/cartSlice';
import '../App.css';

const apiURL = 'https://js2-ecommerce-api.vercel.app/api/products';

const ProductDisplay = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [currentImageIndices, setCurrentImageIndices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSort, setSelectedSort] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setAllProducts(data);
        setProductData(data);
        setCurrentImageIndices(Array(data.length).fill(0));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  useEffect(() => {
    filterProductsByCategory(selectedCategory);
  }, [selectedCategory]);
  
  useEffect(() => {
    handlePriceChange(selectedPrice);
  }, [selectedPrice]);
  
  useEffect(() => {
    setProductData(sortProducts(productData));
  }, [selectedSort]);

  const filterProductsByCategory = (category) => {
    let filteredProducts = allProducts;

    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    setProductData(filteredProducts);
  };

  const handlePriceChange = (price) => {
    let filteredProducts = allProducts;

    if (price) {
      const priceRange = price.split('-');
      const minPrice = Number(priceRange[0]);
      const maxPrice = priceRange[1] ? Number(priceRange[1]) : Infinity;
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    setProductData(sortProducts(filteredProducts));
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const sortProducts = (products) => {
    if (selectedSort === 'lowToHigh') {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'highToLow') {
      return [...products].sort((a, b) => b.price - a.price);
    } else {
      return products;
    }
  };
  const addToCartHandler = (product) => {
    dispatch(addItem(product));
  }

  return (
    <>
      <Hero />
      <Filtering
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        selectedPrice={selectedPrice}
        handlePriceChange={handlePriceChange}
        selectedSort={selectedSort}
        handleSortChange={handleSortChange}
      />
      <Container id="products">
        <Row>
          {productData.length > 0 ? (
            productData.map((product, index) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-3">
                <Card className='product-card p-3 h-100 card-hover d-flex flex-column'>
                  <div className="position-relative">
                    <Link to={`/products/${product._id}`}>
                      <Card.Img
                        variant='top'
                        src={product.images[currentImageIndices[index]]}
                        alt={`${product.name} - Image ${currentImageIndices[index] + 1}`}
                      />
                    </Link>
                    <div className='btn-container d-flex justify-content-between position-absolute top-50 start-0 end-0 translate-middle-y'>
                      <button
                        className='btn-arrow border-0 bg-transparent'
                        onClick={() => prevImage(index)}
                        disabled={product.images.length <= 1}
                      >
                        <i className='bi bi-arrow-left'></i>
                      </button>
                      <button
                        className='btn-arrow border-0 bg-transparent'
                        onClick={() => nextImage(index)}
                        disabled={product.images.length <= 1}>
                        <i className='bi bi-arrow-right'></i>
                      </button>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      <Link to={`/products/${product._id}`} className="product-name">{product.name}</Link>
                    </Card.Title>
                    <div className="price-cart-container mt-auto">
                      <button className='homepage-cart' onClick={() => addToCartHandler(product)} data-cy="homepage-cart">
                        <i className="bi bi-cart"></i>
                      </button>
                      <p className='price text-danger ml-2 mb-0 ms-2'>{product.price}:-</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p>No products available.</p>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
          }
export default ProductDisplay;
