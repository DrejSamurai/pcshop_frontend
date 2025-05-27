import axios from './axios';

export interface User {
  email: string;
  password: string;
  name?: string;
}

const UserService = {
  login: async (user: Pick<User, 'email' | 'password'>): Promise<{ token: string }> => {
    const response = await axios.post<{ token: string }>('/login', user);
    return response.data;
  },

   register: async (user: Pick<User, 'email' | 'password'>): Promise<{ message: string }> => {
    const response = await axios.post<{ message: string }>('/register', user);
    return response.data;
  },
};

export default UserService;