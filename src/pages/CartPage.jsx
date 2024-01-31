import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartItemsCount, removeItem, increaseQuantity, decreaseQuantity } from '../slices/cartSlice'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailHero from '../components/DetailpageHero';
// import DetailpageHero from '../components/DetailpageHero';

//ADD a cart hero to make it look better
const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const itemCount = useSelector(selectCartItemsCount)

  const handleRemove = (item) => {
    dispatch(removeItem(item))
  }

  const handleIncrease = (item) => {
    dispatch(increaseQuantity(item))
  }

  const handleDecrease = (item) => {
    dispatch(decreaseQuantity(item))
  }
  // const cartStyle = {
  //   marginBottom: '350px'
  // }
  //inkludera style={cartStyle} i conatiner div


  return (
    <div className="container" >
      {/* <DetailpageHero /> */}
      <h1 className="my-4">Kundvagn</h1>
      <p className="mb-4">Tillagda varor: {itemCount}</p>
      <div>
        {cartItems.map((item, index) => (
          <div key={item._id} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-2">
                <img src={item.images[0]} alt={`${item.name} - Image`} className="img-fluid rounded-start" />
              </div>
              <div className="col-md-10">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Pris: {item.price}:-</p>
                  <p className="card-text">Antal: {item.quantity}</p>
                  <button className="btn btn-primary me-2" onClick={() => handleDecrease(item)} data-cy="decreaseBtn">-</button>
                  <button className="btn btn-primary me-2" onClick={() => handleIncrease(item)} data-cy="increaseBtn" >+</button>
                  <button className="btn btn-danger" onClick={() => handleRemove(item)} data-cy="deleteBtnCart">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {itemCount > 0 ? (
        <Link to='/payment'>
          <button className="btn btn-success">Gå till kassan </button>
        </Link>
      ) : (
        <button className="btn btn-success" disabled>Gå till kassan</button>
      )}
      
    </div>
  )
}

export default Cart