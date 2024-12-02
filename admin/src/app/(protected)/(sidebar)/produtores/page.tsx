"use client";

import { useEffect, useState } from "react";

import ProducerTable from "@admin/app/components/ProducerTable";
import Title from "@admin/app/components/Title";

import { listFarms } from "@admin/_actions/farms/GET/list-farms";

import SearchInput from "@shared/components/SearchInput";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError"
import { FarmDTO } from "@shared/interfaces/dtos/farm-dto";

export default function page() {
  const [name, setName] = useState<string>("");
  const [farms, setFarms] = useState<FarmDTO[]>();
  const debounceSearch = useDebounce(name);
  const { handleError } = useHandleError();

  useEffect(() => {
    (() => {
      listFarms({
        page: 1,
        farm: debounceSearch,
      }).then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        
        setFarms(response.data);
      });
    })();
  }, [debounceSearch])

  return (
    <div className="w-full flex flex-col h-full gap-6">
      <div className="flex w-full items-center justify-between pt-8">
        <Title>Produtores</Title>
        <div className="w-2/5">
          <SearchInput onChange={setName} />
        </div>
      </div>
      <div className="rounded-xl bg-white">
        <ProducerTable farms={farms}/>
      </div>
    </div>
  );
}