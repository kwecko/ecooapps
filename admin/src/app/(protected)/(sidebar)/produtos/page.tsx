"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

import Title from "@admin/app/components/Title";
import useProductsPage from "@admin/app/(protected)/(sidebar)/produtos";
import ProductModal from "@admin/app/(protected)/(sidebar)/produtos/components/ProductModal/ProductModal";
import { getProductTableColumns } from "@admin/app/(protected)/(sidebar)/produtos/config/table-config";

import Loader from "@shared/components/Loader";
import Button from "@shared/components/ButtonV2";
import EmptyBox from "@shared/components/EmptyBox";
import SearchInput from "@shared/components/SearchInput";
import GenericTable from "@shared/components/GenericTable";
import PagingButton from "@shared/components/PagingButton";

function ProductsPage() {
  const {
    name,
    setName,
    page,
    nextPage,
    prevPage,
    products,
    isPending,
    imageLoader,
  } = useProductsPage();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="w-full h-full overflow-hidden flex flex-col gap-5">
      <div className="w-full flex justify-between">
        <Title>Produtos</Title>
        <div className="flex gap-3 items-center">
          <SearchInput
            placeholder="Filtrar por nome ou categoria"
            onChange={setName}
            type="secondary"
            className="w-86"
          />
          <Button
            variant="default"
            className="flex w-64 justify-center items-center gap-3 bg-rain-forest"
            onClick={toggleModal} 
          >
            Cadastrar produto
            <FaPlus size={18} />
          </Button>
        </div>
      </div>

      <div className="w-full h-full flex flex-col gap-5 overflow-auto justify-between items-center">
        {isPending && (
          <Loader
            className="pt-10"
            width="40"
            height="40"
            loaderType="component"
          />
        )}

        {!isPending && name && products.length === 0 && <EmptyBox type="search" />}

        {!isPending && products.length > 0 && (
          <GenericTable
            data={products}
            columns={getProductTableColumns(imageLoader)}
            gridColumns={16}
            noDataMessage="Nenhum produto encontrado."
          />
        )}

        {!isPending && products.length > 0 && (
          <PagingButton value={page} nextPage={nextPage} backPage={prevPage} />
        )}
      </div>

      {isModalOpen && <ProductModal isOpen={isModalOpen} closeModal={toggleModal} />}
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProductsPage), { ssr: false });
