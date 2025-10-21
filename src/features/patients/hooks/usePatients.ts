import { useEffect } from 'react';
import { usePatientStore } from '../../../store/patientStore';
import { patientService } from '../services/patientService';

export const usePatients = () => {
  const {
    patients,
    isLoading,
    error,
    setPatients,
    addPatient,
    updatePatient,
    deletePatient,
    setLoading,
    setError,
  } = usePatientStore();

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await patientService.getAll();
        setPatients(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error loading Patients';
        setError(errorMessage);
        console.error('Error fetching patients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [setPatients, setLoading, setError]);

  return {
    patients,
    isLoading,
    error,
    addPatient,
    updatePatient,
    deletePatient,
  };
};