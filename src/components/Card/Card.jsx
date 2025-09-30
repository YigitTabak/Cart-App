import placeholder from '../../assets/placeholder.png'
import { useNavigate } from 'react-router-dom'
import './Card.css'

const Card = ({ product, addToCart }) => {
  const navigate = useNavigate()
  return (
    <div className='card-box' data-testid="product-card">
      <img
        src={placeholder}
        alt={product.name}
        className='card-image'
        key={product.id}
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: 'pointer' }}
      />
      <p className='card-price'>{product.price}$</p>
      <h2 className='card-name'>{product.name}</h2>
      <button className='card-button' onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  )
}

export default Card
