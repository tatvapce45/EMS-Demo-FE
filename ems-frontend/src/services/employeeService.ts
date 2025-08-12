import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createEmployee = async (data: FormData) => {
    const response = await axios.post(
        `${API_BASE_URL}/employees/Employees/Add`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response;
};

export const getEmployees = async () => {
    const response = await axios.get(`${API_BASE_URL}/employees/Employees/GetAll`);
    return response.data;
};