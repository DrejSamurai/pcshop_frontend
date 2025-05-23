import axios from "./axios";

const ProductService = {
  getFilteredProducts: (filters) => {
    return axios.get("/products", { params: filters });
  },

  getManufacturers: () => {
    return axios.get("/manufacturers");
  },
};

export default ProductService;