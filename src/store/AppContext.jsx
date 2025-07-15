import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = product => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      setCartItems(prevCart =>
        prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      )
      return
    }
    setCartItems(prevCart => [...prevCart, { ...product, quantity: 1 }])
  }

  const increaseQuantity = id => {
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  const decreaseQuantity = id => {
    setCartItems(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedSort, setSelectedSort] = useState('')
  const [allProducts, setAllProducts] = useState([])
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = import.meta.env.VITE_API_URL
        let params = new URLSearchParams()

        if (selectedBrand && selectedBrand !== 'all') {
          params.append('brand', selectedBrand)
        }
        if (selectedModel && selectedModel !== 'all') {
          params.append('model', selectedModel)
        }
        if (searchTerm && searchTerm.trim() !== '') {
          params.append('name', searchTerm)
        }

        if ([...params].length > 0) {
          url += '?' + params.toString()
        }

        const res = await fetch(url)
        const data = await res.json()

        if (firstRender) {
          setAllProducts(data)
          setFirstRender(false)
        }

        setProducts(Array.isArray(data) && data.length > 0 ? data : [])
      } catch (error) {
        console.error('Hata:', error)
        setProducts([])
      }
    }

    fetchProducts()
  }, [searchTerm, selectedBrand, selectedModel, selectedSort])

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        searchTerm,
        setSearchTerm,
        products,
        selectedBrand,
        setSelectedBrand,
        selectedModel,
        setSelectedModel,
        selectedSort,
        setSelectedSort,
        allProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useStore = () => useContext(AppContext)
