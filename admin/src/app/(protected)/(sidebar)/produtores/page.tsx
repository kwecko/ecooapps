"use client";

import { useEffect, useState } from "react";

import ProducerTable from "@admin/app/components/ProducerTable";
import Title from "@admin/app/components/Title";

import { listFarms } from "@admin/_actions/farms/GET/list-farms";

import SearchInput from "@admin/app/components/SearchInput";
import PagingButton from "@shared/components/PagingButton";
import EmptyBox from "@shared/components/EmptyBox"
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError"
import { FarmDTO } from "@shared/interfaces/dtos/farm-dto";
import Loader from "@shared/components/Loader";

export default function page() {
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState(0);

  const [name, setName] = useState<string>("");
  const [farms, setFarms] = useState<FarmDTO[]>();

  const [isLoading, setIsLoading] = useState(false);
  const debounceSearch = useDebounce(name);
  const { handleError } = useHandleError();
  const [isChange, setIsChange] = useState<boolean>(false);

  const backPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = async () => {
    if(totalItems < 20){
      return;
    }

    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    (() => {
      setIsLoading(true);

      listFarms({
        page: page,
        farm: debounceSearch,
      }).then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        setFarms(response.data);
        setTotalItems(response.data?.length);
        setIsLoading(false);
      });
    })();
  }, [page, debounceSearch, isChange]);

  return (
    <div className="w-full flex flex-col h-full gap-6">
      <div className="flex w-full items-center justify-between pt-8">
        <Title>Produtores</Title>
        <div className="w-2/5">
          <SearchInput placeholder={"Filtrar por agronegócio"} onChange={setName} />
        </div>
      </div>
      {isLoading && <Loader className="mt-3" loaderType="component" />}
      {!isLoading && debounceSearch && farms?.length === 0 && <EmptyBox type="search" />}
      {!isLoading && farms?.length === 0 && <EmptyBox type="producer" />}
      {!isLoading && farms?.length > 0 && (
        <div className="rounded-xl w-full h-full">
          <ProducerTable farms={farms} isChange={isChange} setIsChange={setIsChange} />
        </div>
      )}
      <div className="flex flex-col items-center">
        <PagingButton value={page} nextPage={nextPage} backPage={backPage} />
      </div>
    </div>
  );
}