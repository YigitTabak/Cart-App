export const sortProducts = (array, sortType) =>  {
    return array.sort((a, b) => {
      switch (sortType) {
        case 'Old to New':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'New to Old':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'Price Low to High':
          return parseFloat(a.price) - parseFloat(b.price)
        case 'Price High to Low':
          return parseFloat(b.price) - parseFloat(a.price)
        default:
          return 0
      }
  })}