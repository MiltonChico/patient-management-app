import React from 'react';
import { Modal } from '../../../../shared/components/Modal';
import { PatientForm } from '../PatientForm/PatientForm';
import type { Patient , PatientFormData } from '../../types/patient.types';


interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PatientFormData) => void;
  patient?: Patient;
}

export const PatientModal = ({
  isOpen,
  onClose,
  onSubmit,
  patient,
}: PatientModalProps) => {
  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      title={patient ? 'Edit Patient' : 'Add Patient'}
      description={
        patient
          ? 'Updated the patient information'
          : 'Complete the form to add a new patient'
      }
      size="lg"
    >
      <PatientForm
        patient={patient}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};