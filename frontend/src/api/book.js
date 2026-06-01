import axios from "axios";

const BASE_URL = 'http://localhost:7000';

export const getAllBooks = async() => {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data;
};

export const getBookById = async (id) => {
    const response = await axios.get(`${BASE_URL}/books/${id}`);
    return response.data;
};

 export const createBook = async(bookData) => {
    const response = await axios.post(`${BASE_URL}/books`, bookData);
    return response.data;
 }

 export const updateBook = async(id,bookData) => {
    const response = await axios.put(`${BASE_URL}/books/${id}`, bookData);
     return response.data;
 }

 export const deleteBook = async(id) => {
    const response = await axios.delete(`${BASE_URL}/books/${id}`);
    return response.data;
 }