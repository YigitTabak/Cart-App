import React, { useEffect } from 'react'
import './Header.css'
import { useStore } from '../store/AppContext'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Header = () => {
  const { cartItems, setSearchTerm, searchTerm } = useStore()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams)

      if (searchTerm) {
        newParams.set('name', searchTerm)
      } else {
        newParams.delete('name')
      }

      return newParams
    })
  }, [searchTerm, setSearchParams])

  return (
    <div className='container'>
      <div className='header-wrapper'>
        <div className='header-text'>
          <h1 onClick={() => navigate(`/`)}>Cart App</h1>
        </div>
        <div className='header-search'>
          <input
            type='text'
            placeholder='Search...'
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className='header-icons-wrapper'>
        <div className='header-icons'>
          <div className='header-cart'>
            <i className='fa-solid fa-cart-shopping'></i>
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0,
            )}
            $
          </div>
          <div className='header-profile'>
            <i className='fa-solid fa-user'></i>Yiğit
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
