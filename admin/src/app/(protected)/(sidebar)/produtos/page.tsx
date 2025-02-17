"use client";

import dynamic from "next/dynamic";
import { FaPlus } from "react-icons/fa6";

import useProductsPage from "@admin/app/(protected)/(sidebar)/produtos";
import Title from "@admin/app/components/Title";
import DeleteProductModal from "./components/DeleteProductModal/DeleteProductModal";
import CreateProductModal from "./components/ProductModal/CreateProductModal";
import { getProductTableColumns } from "./config/table-config";

import TableSkeleton from "@admin/app/components/TableSkeleton";
import Button from "@shared/components/ButtonV2";
import EmptyBox from "@shared/components/EmptyBox";
import GenericTable from "@shared/components/GenericTable";
import PagingButton from "@shared/components/PagingButton";
import SearchInput from "@shared/components/SearchInput";
import UpdateProductModal from "./components/UpdateProductModal/UpdateProductModal";
import { useEffect } from "react";

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
    toggleModal,
    isOpenCreateProductModal,
    isOpenDeleteProductModal,
    isOpenUpdateProductModal,
    selectedProduct,
    reloadProducts,
  } = useProductsPage();

  return (
    <div className="w-full flex flex-col h-full gap-6 overflow-y-hidden items-stretch relative">
      <div className="flex justify-between items-center w-full">
        <Title>Produtos</Title>

        <div className="flex gap-3 items-center">
          <SearchInput
            placeholder="Filtrar por nome ou categoria"
            onChange={setName}
            value={name}
            type="secondary"
            className="w-86"
          />
          <Button
            variant="default"
            className="flex w-64 justify-center items-center gap-3 bg-rain-forest"
            onClick={() => toggleModal("isOpenCreateProductModal")}
          >
            Cadastrar produto
            <FaPlus size={18} />
          </Button>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-5 overflow-auto justify-between items-center">
        {isPending && <TableSkeleton />}

        {!isPending && name && products.length === 0 && (
          <EmptyBox type="search" />
        )}

        {!isPending && products.length > 0 && (
          <GenericTable
            data={products}
            columns={getProductTableColumns(imageLoader, toggleModal)}
            gridColumns={16}
          />
        )}

        {!isPending && products.length > 0 && (
          <PagingButton value={page} nextPage={nextPage} backPage={prevPage} />
        )}
      </div>

      {isOpenCreateProductModal && (
        <CreateProductModal
          isOpen={isOpenCreateProductModal}
          closeModal={() => toggleModal("isOpenCreateProductModal")}
          product={selectedProduct}
          imageLoader={imageLoader}
          reloadProducts={reloadProducts}
        />
      )}

      {isOpenUpdateProductModal && (
        <UpdateProductModal
          isOpen={isOpenUpdateProductModal}
          closeModal={() => toggleModal("isOpenUpdateProductModal")}
          product={selectedProduct}
          reloadProducts={reloadProducts}
          imageLoader={imageLoader}
        />
      )}

      {isOpenDeleteProductModal && (
        <DeleteProductModal
          isOpen={isOpenDeleteProductModal}
          closeModal={() => toggleModal("isOpenDeleteProductModal")}
          product={selectedProduct}
          reloadProducts={reloadProducts}
        />
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProductsPage), { ssr: false });
