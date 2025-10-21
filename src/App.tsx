import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { usePatients } from './features/patients/hooks/usePatients';
import { PatientList } from './features/patients/components/PatientList/PatientList';
import { PatientModal } from './features/patients/components/PatientModal/PatientModal';
import { Button } from './shared/components/Button';
import { NotificationContainer } from './shared/components/Notification';
import { useNotification } from './shared/hooks/useNotification';
import type { Patient, PatientFormData } from './features/patients/types/patient.types';
import './styles/globals.css';
import styles from './App.module.css';
import React from 'react';

function App() {
  const { patients, isLoading, addPatient, updatePatient, deletePatient, error } = usePatients();
  const { notifications, showNotification, removeNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();

  const handleOpenModal = () => {
    setSelectedPatient(undefined);
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(undefined);
  };

  const handleSubmit = (data: PatientFormData) => {
    try {
      if (selectedPatient) {
        const updatedPatient: Patient = {
          ...selectedPatient,
          name: data.name,
          avatar: data.avatar,
          description: data.description,
          website: data.website,
        };
        updatePatient(selectedPatient.id, updatedPatient);
        showNotification('Updated Patient', 'success');
      } else {
        // Agregar nuevo paciente
        const newPatient: Patient = {
          id: Date.now().toString(),
          name: data.name,
          avatar: data.avatar,
          description: data.description,
          website: data.website,
          createdAt: new Date().toISOString(),
        };
        addPatient(newPatient);
        showNotification('Patient added', 'success');
      }
      handleCloseModal();
    } catch (error) {
      showNotification('Error updating Patient', 'error');
      console.error(error);
    }
  };

  const handleDeletePatient = (id: string) => {
    if (window.confirm('¿Do you wana delete this Patient?')) {
      try {
        deletePatient(id);
        showNotification('Patient deleted succesfully', 'success');
      } catch (error) {
        showNotification('Error on delete Patient', 'error');
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.app}>
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>Patients Manager</h1>
            <p className={styles.subtitle}>
              Update and manage your patients easily.
            </p>
          </div>
          <Button onClick={handleOpenModal} size="lg">
            <PlusIcon />
          Add Patient
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <PatientList
          patients={patients}
          onEdit={handleEditPatient}
          onDelete={handleDeletePatient}
          isLoading={isLoading}
          error={error}
        />
      </main>

      <PatientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        patient={selectedPatient}
      />
    </div>
  );
}

export default App;