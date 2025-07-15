import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../src/store/AppContext'
import Products from '../src/components/Products'
import Card from '../src/components/Card'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Products Navigation', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    brand: 'Test Brand',
    model: 'Test Model'
  }

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  test('should navigate to product detail page when clicking product image', () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Card product={mockProduct} />
        </AppProvider>
      </BrowserRouter>
    )

    
    const productImage = screen.getByRole('img', { name: mockProduct.name })
    fireEvent.click(productImage)

    
    expect(mockNavigate).toHaveBeenCalledWith(`/product/${mockProduct.id}`)
  })

})