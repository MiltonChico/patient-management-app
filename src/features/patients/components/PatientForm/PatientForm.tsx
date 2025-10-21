
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../shared/components/Input';
import { Button } from '../../../../shared/components/Button';
import { patientSchema, type PatientFormSchema } from '../../schemas/patientSchema';
import type { Patient, PatientFormData } from '../../types/patient.types';
import styles from './PatientForm.module.css';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const PatientForm = ({
  patient,
  onSubmit,
  onCancel,
  isLoading = false,
}: PatientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormSchema>({
    resolver: zodResolver(patientSchema),
    defaultValues: patient
      ? {
          name: patient.name,
          avatar: patient.avatar,
          description: patient.description,
          website: patient.website,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Patient Information</h3>
        <div className={styles.grid}>
          <Input
            label="Full Name"
            id="name"
            placeholder="Ex: Sam Oconnor"
            error={errors.name?.message}
            required
            {...register('name')}
          />
          <Input
            label="Avatar URL"
            id="avatar"
            type="url"
            placeholder="https://ejemplo.com/avatar.jpg"
            error={errors.avatar?.message}
            required
            {...register('avatar')}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Description</h3>
        <div className={styles.textareaWrapper}>
          <label className={styles.label} htmlFor="description">
            Patient Description
            <span className={styles.required}>*</span>
          </label>
          <textarea
            id="description"
            placeholder="Add a brief description about the patient"
            className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
            rows={5}
            {...register('description')}
          />
          {errors.description && (
            <span className={styles.errorText}>{errors.description.message}</span>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Contact Information</h3>
        <Input
          label="
          Website URL"
          id="website"
          type="url"
          placeholder="https://ejemplo.com"
          error={errors.website?.message}
          required
          {...register('website')}
        />
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {patient ? 'Updated Patient' : 'Add Patient'}
        </Button>
      </div>
    </form>
  );
};