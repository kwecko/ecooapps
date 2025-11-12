"use client";

import Title from "@admin/app/components/Title";

export default function PainelPage() {
  return (
    <div className="w-full flex flex-col h-full gap-6 overflow-y-hidden items-stretch relative">
      <Title>Painel da Feira</Title>
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Hello World</p>
      </div>
    </div>
  );
}

