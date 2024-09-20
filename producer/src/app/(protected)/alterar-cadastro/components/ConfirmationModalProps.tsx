import { ReactNode } from 'react';

export interface Datas {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  email: string;
  cpf: string;
}

export interface ConfirmationModalProps {
  info: Datas;
  openButton: ReactNode;
  link: string;
}