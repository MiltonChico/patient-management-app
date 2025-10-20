import React from 'react'
import type { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = 'md',
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={`${styles.content} ${styles[size]}`}>
          <div className={styles.header}>
            <div>
              <Dialog.Title className={styles.title}>{title}</Dialog.Title>
              {description && (
                <Dialog.Description className={styles.description}>
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close className={styles.closeButton}>
              <Cross2Icon />
            </Dialog.Close>
          </div>
          <div className={styles.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};