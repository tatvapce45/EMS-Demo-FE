import axios from "axios";

const API_BASE_URL = "http://localhost:5174"; 

export const login = async (loginIdentifier: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/Auth/login`, {
        loginIdentifier,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Login failed" };
  }
};
