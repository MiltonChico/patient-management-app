import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { Card } from '../../../../shared/components/Card';
import { Button } from '../../../../shared/components/Button';
import type { Patient } from '../../types/patient.types';
import styles from './PatientCard.module.css';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
}

export const PatientCard = ({
  patient,
  onEdit,
  onDelete,
}: PatientCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };


  return (
   <Card hover className={styles.card}>
      <div className={styles.header}>
        <img
          src={patient.avatar}
          alt={patient.name}
          className={styles.avatar}
          loading="lazy"
        />
        <div className={styles.info}>
          <h3 className={styles.name}>{patient.name}</h3>
        <p className={styles.date}>Registered on: {formatDate(patient.createdAt)}</p>
        </div>
        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(patient)}
            aria-label="Edit patient"
          >
            <Pencil1Icon />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(patient.id)}
            aria-label="Delete patient"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.details}
          >
            <div className={styles.detailsContent}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Descripción:</span>
                <p className={styles.description}>{patient.description}</p>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>WebSite:</span>
                
                <a href={patient.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link} >
                  
                
                  {patient.website}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};