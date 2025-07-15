import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../src/store/AppContext'
import Products from '../src/components/Products'
import Filters from '../src/components/Filters'

const mockProducts = [
    { 
      id: 1, 
      name: 'Product 1', 
      brand: 'Brand A', 
      model: 'Model X', 
      price: 100,
      createdAt: '2024-01-01' 
    },
    { 
      id: 2, 
      name: 'Product 2', 
      brand: 'Brand B', 
      model: 'Model Y', 
      price: 200,
      createdAt: '2024-01-02'
    },
    { 
      id: 3, 
      name: 'Product 3', 
      brand: 'Brand A', 
      model: 'Model Z', 
      price: 300,
      createdAt: '2024-01-03'
    }
  ]


describe('Filters and Products Integration', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts)
      })
    )

    render(
      <BrowserRouter>
        <AppProvider>
          <Filters />
          <Products />
        </AppProvider>
      </BrowserRouter>
    )
  })

  test('should filter products when brand filter is selected', async () => {
    await waitFor(() => {
        const brandInput = screen.getAllByTestId("brand-filter")[0];
        expect(brandInput).toBeInTheDocument();
        console.log(brandInput.value)
        fireEvent.click(brandInput);

        const newFilteredArray = mockProducts.filter((product)=> product.brand === brandInput.value)
        console.log(newFilteredArray);
        newFilteredArray.map((el) => {
            console.log("Filtered products:", el.name)
            expect(screen.getByText(el.name))
        })
    }); 
  })
})