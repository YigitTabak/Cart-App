import './App.css'
import Header from './components/Header'
import Products from './components/Products'
import Filters from './components/Filters'
import Cart from './components/Cart'
import ProductDetail from './components/ProductDetail'
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
        <div className='header-app'>
          <Header />
        </div>
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
