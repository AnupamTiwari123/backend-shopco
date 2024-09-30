import axios from "axios";

const api = axios.create({
    baseURL: `${window.location.origin}/api`,
    withCredentials: true,  
});

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUserDetails = async () => {
    try {
        const response = await api.get('/users/me');
        return response.data; 
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserDetails = async (userData) => {
    try {
        const response = await api.put('/users/me', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
