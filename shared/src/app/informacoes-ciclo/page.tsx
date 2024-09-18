'use client'

import React from 'react';
import Table from './components/Table';
import Button from '../../components/Button';
import Link from 'next/link';
import { LuChevronLeft } from 'react-icons/lu';
import { IoIosHelp } from 'react-icons/io';

import { AppID } from "../../library/types/app-id";

interface InformacoesCicloProps {
  bgColor: string
}

export default function InformacoesCiclo({ bgColor }: InformacoesCicloProps) {
  return (
    <div className="w-full h-screen  bg-theme-background">
      <div className='w-full h-[90%] p-5 flex items-center flex-col'>
        <div className="flex flex-col h-[35%] w-full items-center justify-end">
          <h1 className="text-3xl font-medium text-slate-gray mb-4 text-center">Informações <br /> do Ciclo</h1>
          <span className="text-sm font-medium text-slate-gray mb-6 text-center">
            No e-COO, cada Centro de <br />
            Distribuição (CDD) tem seu próprio <br />
            ciclo de funcionamento. Confira as <br />
            definições do ciclo selecionado:
          </span>
        </div>
        <div className="w-full h-[65%] flex flex-col justify-between">
          <div className='overflow-y-auto mb-6'>
            <Table bgColor={bgColor} />
          </div>
          <Button className="w-full px-2 py-3 font-semibold rounded-lg text-white border-0 p-2 bg-theme-default">
            <Link href={'/'}>
              OK, entendi
            </Link>
          </Button>
        </div>
      </div>
      <div className='w-full h-[10%] flex justify-between items-center p-5'>
        <Link href={"/"} className="flex items-center">
          <LuChevronLeft 
            style={{ color: bgColor }}
            className="w-[30px] h-[30px]" />
          <Button 
            style={{ color: bgColor }}
            className="flex items-center gap-2 text-sm font-medium w-auto"
          >
            Voltar
          </Button>
        </Link>
        <IoIosHelp
          style={{ backgroundColor: bgColor }}
          className="w-[50px] h-[50px] rounded-full border-0 text-white "
        />
      </div>
    </div>
  );
}
