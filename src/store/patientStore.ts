import { create } from 'zustand';
import type { Patient } from '../features/patients/types/patient.types';

interface PatientStore {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  setPatients: (patients: Patient[]) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Patient) => void;
  deletePatient: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  isLoading: false,
  error: null,
  
  setPatients: (patients) => set({ patients }),
  
  addPatient: (patient) =>
    set((state) => ({
      patients: [patient, ...state.patients],
    })),
  
  updatePatient: (id, updatedPatient) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === id ? updatedPatient : patient
      ),
    })),
  
  deletePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((patient) => patient.id !== id),
    })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
}));