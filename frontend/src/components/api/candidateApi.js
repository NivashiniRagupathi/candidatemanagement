import axios from 'axios';

const API_URL = 'https://candidatemanagement.onrender.com/api/candidates';

export const getCandidates = () => axios.get(API_URL);
export const addCandidate = (data) => axios.post(API_URL, data);
export const deleteCandidate = (id) => axios.delete(`${API_URL}/${id}`);
