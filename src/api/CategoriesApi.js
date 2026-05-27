import api from './BaseApi'

export const CategoriesApi = {
  getAll() {
    return api.get('/products/categories')
  },

  getProductsByCategory(slug, limit = 20, skip = 0) {
    return api.get(`/products/category/${slug}?limit=${limit}&skip=${skip}`)
  }
}
