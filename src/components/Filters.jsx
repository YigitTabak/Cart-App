import React, { useEffect, useState } from 'react'
import { useStore } from '../store/AppContext'
import './Filters.css'
import { useSearchParams } from 'react-router-dom'

const Filters = () => {
  const {
    products,
    setSelectedModel,
    setSelectedBrand,
    setSelectedSort,
    selectedSort,
    selectedModel,
    selectedBrand,
    allProducts,
  } = useStore()
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (allProducts.length > 0) {
      setBrands([...new Set(allProducts.map(product => product.brand))])
      setModels([...new Set(allProducts.map(product => product.model))])
    }
  }, [allProducts])

  useEffect(() => {
    setSearchParams(new URLSearchParams())
    setSelectedBrand(null)
    setSelectedModel(null)
    setSelectedSort(null)
  }, [])

  const updateUrlParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams)

    if (value && value !== 'all') {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }

    setSearchParams(newParams)
  }

  const handleModelChange = event => {
    const value = event.target.value
    if (selectedModel === value) {
      setSelectedModel(null)
      updateUrlParams('model', null)
    } else {
      setSelectedModel(value)
      updateUrlParams('model', value)
    }
  }

  const handleBrandChange = event => {
    const value = event.target.value
    if (selectedBrand === value) {
      setSelectedBrand(null)
      updateUrlParams('brand', null)
    } else {
      setSelectedBrand(value)
      updateUrlParams('brand', value)
    }
  }

  const handleSortChange = event => {
    const value = event.target.value
    if (selectedSort === value) {
      setSelectedSort(null)
      updateUrlParams('sort', null)
    } else {
      setSelectedSort(value)
      updateUrlParams('sort', value)
    }
  }

  return (
    <div className='filters-box'>
      <div className='filters-sort-box'>
        <span>Sort By</span>
        <div className='filters-sort-by'>
          {[
            'Old to New',
            'New to Old',
            'Price Low to High',
            'Price High to Low',
          ].map((option, index) => (
            <div key={index} className='filters-sort-item'>
              <input
                data-testid="sort-filter"
                type='checkbox'
                name='sort-filter'
                value={option}
                checked={selectedSort === option}
                onChange={handleSortChange}
              />
              <span className='filters-spans'>{option}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='filters-brands-box'>
        <span>Brands</span>
        <div className='filters-brands'>
          {brands.map((brand, index) => (
            <div key={index} className='filters-sort-item'>
              <input
                type='checkbox'
                name='brand-filter'
                data-testid="brand-filter"
                value={brand}
                checked={selectedBrand === brand}
                onChange={handleBrandChange}
              />
              <span className='filters-spans'>{brand}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='filters-brands-box'>
        <span className='filters-span'>Model</span>
        <div className='filters-brands'>
          {models.map((model, index) => (
            <div key={index} className='filters-sort-item'>
              <input
                type='checkbox'
                name='model-filter'
                value={model}
                checked={selectedModel === model}
                onChange={handleModelChange}
              />
              <span className='filters-spans'>{model}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filters
