import axios from 'axios';
import type { Patient } from '../types/patient.types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const patientService = {
  getAll: async (): Promise<Patient[]> => {
    const response = await axios.get<Patient[]>(API_URL);
    return response.data;
  },
};