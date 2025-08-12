import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCountries = async () => {
    const response = await axios.get(`${API_BASE_URL}/geo/Geo/countries`);
    return response.data;
};

export const getStates = async (countryId: string) => {
    const response = await axios.get(`${API_BASE_URL}/geo/Geo/states/${countryId}`);
    return response.data;
};

export const getCities = async (stateId: string) => {
    const response = await axios.get(`${API_BASE_URL}/geo/Geo/cities/${stateId}`);
    return response.data;
};