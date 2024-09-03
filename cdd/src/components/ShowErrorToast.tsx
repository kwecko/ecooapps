'use client'

import { toast } from 'sonner';
import CustomToastError from './CustomToastError';

export function showErrorToast(error: string, labelButton: string, redirectTo: string) {
  toast.error(
    <CustomToastError 
      error={error} 
      labelButton={labelButton} 
      redirectTo={redirectTo} 
    />,
    {
      duration: Infinity,
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
      },
    }
  );
}
