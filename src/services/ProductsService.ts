import axios from "./axios";

const ProductService = {
  getFilteredProducts: (filters) => {
    return axios.get("/products", { params: filters });
  },

 getManufacturers: (category = "") => {
    const params = category ? { category } : {};
    return axios.get("/manufacturers", { params });
  },

  getStores: () => {
    return axios.get("/stores");
  },

  getProxiedImageUrl: (imageUrl) => {
    if (!imageUrl) return "";
    return `http://pcpartsmk.store:3000/image-proxy?url=${encodeURIComponent(imageUrl)}`;
  },

  getProductById(id) {
  return axios.get(`/product/${id}`);
  },
  
  getRandomProducts: () => {
    return axios.get("/products/random");
  },
};

export default ProductService;