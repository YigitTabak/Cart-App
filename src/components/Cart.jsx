import React from 'react'
import './Cart.css'
import { useStore } from '../store/AppContext'

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity } = useStore()
  console.log(cartItems) 
  return (
    <div className='cart-container '>
      <div className='cart-items'>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id} className='cart-infos'>
              <div className='cart-detail'>
                <p className='cart-name'>{item.name}</p>
                <p className='cart-price'>{item.price} TL</p>
              </div>
              <div className='cart-quantity'>
                <button
                  className='cart-buttons'
                  onClick={() => decreaseQuantity(item.id)}
                > - </button>
                <div className='cart-span-wrapper'>
                  <span className='cart-span'>{item.quantity}</span>
                </div>
                <button
                  className='cart-buttons'
                  onClick={() => increaseQuantity(item.id)}
                > + </button>
              </div>
            </div>
          ))
        ) : (
          <p data-testid="cartEmpty" className='cart-empty'>Cart is empty</p>
        )}
      </div>
      <div className='checkout'>
        <div className='checkout-infos'>
          <p>Total Price:&nbsp;</p>
          <p data-testid="checkout-price" className='checkout-price'>
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0,
            )}
            $
          </p>
        </div>
        <div>
          <button className='checkout-button'>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
