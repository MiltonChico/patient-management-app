import React from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export const Card = ({
  children,
  hover = false,
  className = '',
  ...props
}: CardProps) => {
  return (
    <div
      className={`${styles.card} ${hover ? styles.hover : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};