import React, { useEffect } from 'react'
import './Navbar.css'
import { useStore } from '../../store/AppContext'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Navbar = () => {
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
    <div className='navbar-container'>
      <div className='navbar-wrapper'>
        <div className='navbar-text'>
          <p onClick={() => navigate(`/`)}>Cart App</p>
        </div>
        <div className='navbar-search'>
          <input
            type='text'
            placeholder='Search...'
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className='navbar-icons-wrapper'>
        <div className='navbar-icons'>
          <div className='navbar-cart'>
            <i className='fa-solid fa-cart-shopping'></i>
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0,
            )}
            $
          </div>
          <div className='navbar-profile'>
            <i className='fa-solid fa-user'></i>Yiğit
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
