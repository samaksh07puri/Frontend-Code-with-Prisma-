import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Node.js backend URL

export const getUsers = () => axios.get(`${API_URL}/users`);
export const addUser = (user) => axios.post(`${API_URL}/users`, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);
