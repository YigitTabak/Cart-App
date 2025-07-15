import React, { useState } from 'react'
import './Product.css'
import Card from './Card'
import { useStore } from '../store/AppContext'
import { sortProducts } from '../util/filters.util'

const Products = () => {
  const { addToCart, products, selectedSort } = useStore()
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  const sortedProducts = sortProducts(products, selectedSort)
  
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )

  const nextPage = () => {
    if (indexOfLastProduct < products.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className='products-container'>
      <div className='products'>
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <Card key={product.id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p className='no-results'>Ürün bulunamadı.</p>
        )}
      </div>
      {products.length > productsPerPage && (
        <div className='pagination'>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className='pagination-button'
          >
            Prev
          </button>
          <span className='pagination-info'>Page {currentPage}</span>
          <button
            onClick={nextPage}
            disabled={indexOfLastProduct >= products.length}
            className='pagination-button'
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Products
