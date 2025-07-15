import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../src/store/AppContext'
import Cart from '../src/components/Cart'

describe('Cart Component', () => {
  test('should show empty cart message when cart is empty', () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Cart />
        </AppProvider>
      </BrowserRouter>
    )
    expect(screen.getByTestId('cartEmpty')).toBeInTheDocument()

    const priceElement = screen.getByTestId('checkout-price')
    expect(priceElement).toBeInTheDocument()
    expect(priceElement.textContent).toBe('0$')
  })
})

