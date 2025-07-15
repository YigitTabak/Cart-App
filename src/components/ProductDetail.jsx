import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductDetail.css'
import { useStore } from '../store/AppContext'
import dummy from '../assets/dummy.png'
const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useStore()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`,
        )
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.error('Hata:', error)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div className='productDetail-container'>
      <div className='productDetail-wrapper'>
        <img src={dummy} alt={product.name} className='productDetail-image' />
        <div className='productDetail-infos'>
          <h2 className='productDetail-name'>{product.name}</h2>
          <p className='productDetail-price'>{product.price} TL</p>
          <button
            onClick={() => addToCart(product)}
            className='productDetail-button'
          >
            Add to Cart
          </button>
          <p className='productDetail-desc'>{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
