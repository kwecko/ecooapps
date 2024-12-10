"use client"

import { useState } from "react";

import Title from "@admin/app/components/Title";

import { FaPlus } from "react-icons/fa6";

import Button from "@shared/components/ButtonV2";
import SearchInput from "@shared/components/SearchInput"
import PaginfButton from "@shared/components/PagingButton"
import ProductsTable from "./components/ProductsTable";

import useProductsPage from "@admin/app/(protected)/(sidebar)/produtos/index"

export default function page() {
  const { setName } = useProductsPage();

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
            className="flex w-64 justify-center items-center gap-3"
          >
            Cadastrar produto
            <FaPlus size={18} />
          </Button>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-5 overflow-auto">
        <ProductsTable />
        <PaginfButton />
      </div>
    </div>
  )
}
