import axios from 'axios';
import type { Patient } from '../types/patient.types';

const API_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const patientService = {
  getAll: async (): Promise<Patient[]> => {
    try {
      const response = await apiClient.get<Patient[]>('');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('La conexión con el servidor tardó demasiado. Por favor, intenta nuevamente.');
        }
        if (error.response) {
          throw new Error(`Error del servidor: ${error.response.status}`);
        }
        if (error.request) {
          throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        }
      }
      throw new Error('Error desconocido al cargar los pacientes');
    }
  },
};