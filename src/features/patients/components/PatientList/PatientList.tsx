import React from 'react';
import type { Patient } from '../../types/patient.types';
import { PatientCard } from '../PatientCard/PatientCard';
import styles from './PatientList.module.css';

interface PatientListProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  error?: string | null;
}

export const PatientList = ({
  patients,
  onEdit,
  onDelete,
  isLoading,
  error,
}: PatientListProps) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading patients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p className={styles.errorTitle}>⚠️ Error adding patient</p>
          <p className={styles.errorText}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No hay pacientes registrados</p>
          <p className={styles.emptyText}>
            Start adding patients to see them listed here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};