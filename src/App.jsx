import './App.css'
import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import Filters from './components/Filters/Filters'
import Cart from './components/Cart/Cart'
import ProductDetail from './components/ProductDetail/ProductDetail'
import { AppProvider } from './store/AppContext'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'

function App() {
  return (
    <AppProvider>
      <Router>
          <Navbar />
        <Routes>
          <Route path='/*' element={<Content />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

function Content() {
  const location = useLocation()
  const isDetailPage = location.pathname.startsWith('/product/')

  return (
    <div className={`app-container ${isDetailPage ? 'detail-view' : ''}`}>
      <Routes>
        <Route
          path='/product/:id'
          element={
            <div className='product-detail-app'>
              <ProductDetail />
            </div>
          }
        />

        <Route
          path='/'
          element={
            <>
              <div className='filters-app'>
                <Filters />
              </div>
              <div className='products-app'>
                <Products />
              </div>
            </>
          }
        />
      </Routes>
      <div className='cart-app'>
        <Cart />
      </div>
    </div>
  )
}

export default App
