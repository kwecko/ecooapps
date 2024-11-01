import React from 'react';
import Image from 'next/image';

const EmptyBoxSearch = () => {
  return (
    <div className="flex-grow flex h-full">
      <div className="flex flex-col w-full pb-20 justify-center gap-4 items-center">
        <Image
          src="/empty-box.png"
          alt="bag"
          width={180}
          height={100}
          quality={100}
          className="object-contain"
        />
        <span className="text-center font-medium w-60 text-slate-gray">
          Não encontramos resultados para a sua pesquisa.
        </span>
      </div>
    </div>
  );
}

export default EmptyBoxSearch;