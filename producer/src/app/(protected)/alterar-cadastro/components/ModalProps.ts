import { ReactNode, useState } from "react";

export interface Datas {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  email: string;
  cpf: string;
}

export interface ModalProps {
  info: Datas;
  openButton: ReactNode;
  title: string;
  description: string;
  approvalButtons: boolean;
  textButton1: string;
  textButton2: string;
  bgButton2: string;
  link2: string;
  button2?: ReactNode;
}