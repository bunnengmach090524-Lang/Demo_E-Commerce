import api from './BaseApi'

export const ProductApi = {
  // Get all products with pagination
  getAll(limit = 20, skip = 0) {
    return api.get(`/products?limit=${limit}&skip=${skip}`)
  },

  // Get single product
  getById(id) {
    return api.get(`/products/${id}`)
  },

  // Search products
  search(query) {
    return api.get(`/products/search?q=${encodeURIComponent(query)}`)
  },

  // Get products by category
  getByCategory(category, limit = 20, skip = 0) {
    return api.get(`/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`)
  },

  // Get all categories
  getCategories() {
    return api.get('/products/categories')
  },

  // Sort products
  getSorted(sortBy = 'price', order = 'asc', limit = 20) {
    return api.get(`/products?limit=${limit}&sortBy=${sortBy}&order=${order}`)
  }
}
