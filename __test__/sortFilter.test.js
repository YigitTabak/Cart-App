import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../src/store/AppContext'
import Products from '../src/components/Products'
import Filters from '../src/components/Filters'
import { sortProducts } from '../src/util/filters.util'

const mockProducts = [
    { 
      id: 1, 
      name: 'Product 1', 
      brand: 'Brand A', 
      model: 'Model X', 
      price: 300,
      createdAt: '2024-01-01' 
    },
    { 
      id: 2, 
      name: 'Product 2', 
      brand: 'Brand B', 
      model: 'Model Y', 
      price: 100,
      createdAt: '2024-01-02'
    },
    { 
      id: 3, 
      name: 'Product 3', 
      brand: 'Brand A', 
      model: 'Model Z', 
      price: 200,
      createdAt: '2024-01-03'
    }
]

describe('Sort Filter Tests', () => {
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

    test('should sort products from low to high price', async () => {
        await waitFor(() => {
            const sortInputs = screen.getAllByTestId("sort-filter");
            fireEvent.click(sortInputs[2]);
            
            const sortedItems = sortProducts(mockProducts, "Price Low to High")

            const sortedPrices = mockProducts.sort((a, b) => a.price - b.price).map(product => product.price);

            const productPrices = screen.getAllByText(/\d+\$/);
            productPrices.forEach((priceElement, index) => {
                expect(priceElement.textContent).toBe(`${sortedPrices[index]}$`);
            });

            sortedPrices.forEach((element, idx) => {
                expect(element).toBe(sortedItems[idx].price);
            });
        });
    });

    test('should sort products from high to low price', async () => {
        await waitFor(() => {
            const sortInputs = screen.getAllByTestId("sort-filter");
            fireEvent.click(sortInputs[3]);

            const sortedPrices = mockProducts.sort((a, b) => b.price - a.price).map(product => product.price);

            const productPrices = screen.getAllByText(/\d+\$/);
            productPrices.forEach((priceElement, index) => {
                expect(priceElement.textContent).toBe(`${sortedPrices[index]}$`);
            });
        });
    });
});