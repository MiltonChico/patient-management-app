import React from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { NotificationType } from '../../hooks/useNotification';
import styles from './Notification.module.css';

interface NotificationProps {
  id: string;
  message: string;
  type: NotificationType;
  onClose: (id: string) => void;
}

export const Notification = ({
  id,
  message,
  type,
  onClose,
}: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`${styles.notification} ${styles[type]}`}
    >
      <p className={styles.message}>{message}</p>
      <button
        onClick={() => onClose(id)}
        className={styles.closeButton}
        aria-label="Close notification"
      >
        <Cross2Icon />
      </button>
    </motion.div>
  );
};

interface NotificationContainerProps {
  notifications: Array<{
    id: string;
    message: string;
    type: NotificationType;
  }>;
  onClose: (id: string) => void;
}

export const NotificationContainer = ({
  notifications,
  onClose,
}: NotificationContainerProps) => {
  return (
    <div className={styles.container}>
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};