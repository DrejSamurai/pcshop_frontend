import axios from './axios';

export interface Configuration {
  id: number;
  userID: number;
  name: string;
  products?: Product[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  code?: string;
  image?: string;
  link?: string;
  manufacturer?: string;
  store?: string;
  warranty?: number;
}

const ConfigurationService = {
  create: async (userID: number, name: string): Promise<{ configID: number }> => {
    const response = await axios.post<{ configID: number }>('/configurations', {
      userID, 
      name
    });
    return response.data;
  },

  addProduct: async (configID: number, productID: number): Promise<{ message: string }> => {
    const response = await axios.post<{ message: string }>(`/configurations/${configID}/products`, {
      productID
    });
    return response.data;
  },

  removeProduct: async (configID: number, productID: number): Promise<{ message: string }> => {
    const response = await axios.delete<{ message: string }>(
      `/configurations/${configID}/products/${productID}`
    );
    return response.data;
  },

  getByUser: async (userID: number): Promise<Configuration[]> => {
    const response = await axios.get<Configuration[]>(`/users/${userID}/configurations`);
    return response.data;
  },
};

export default ConfigurationService;