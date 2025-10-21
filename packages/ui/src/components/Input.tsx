import React from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
}

const inputVariants = {
  default: 'border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
  filled: 'border-transparent bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
  outline: 'border-2 border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
};

const inputSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

export function Input({
  variant = 'default',
  size = 'md',
  error = false,
  label,
  helperText,
  errorText,
  className,
  id,
  ...props
}: InputProps) {
  const hasError = error || !!errorText;

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className='block text-sm font-medium text-[var(--color-text-secondary)] mb-1'
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full rounded-md border transition-colors',
          'placeholder:text-[var(--color-text-tertiary)]',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          hasError && 'border-[var(--color-error)] bg-[var(--color-error-bg)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]',
          !hasError && inputVariants[variant],
          inputSizes[size],
          className
        )}
        {...props}
      />
      {(helperText || errorText) && (
        <p className={cn(
          'mt-1 text-sm',
          hasError ? 'text-[var(--color-error)]' : 'text-[var(--color-text-tertiary)]'
        )}>
          {errorText || helperText}
        </p>
      )}
    </div>
  );
}
