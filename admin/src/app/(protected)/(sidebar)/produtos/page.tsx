"use client";

import dynamic from "next/dynamic";
import { FaBars } from "react-icons/fa6";
import { LuEye, LuEyeOff } from "react-icons/lu";

import useProductsPage from "@admin/app/(protected)/(sidebar)/produtos";
import Title from "@admin/app/components/Title";
import DeleteProductModal from "./components/DeleteProductModal/DeleteProductModal";
import CreateProductModal from "./components/ProductModal/CreateProductModal";
import UpdateProductModal from "./components/UpdateProductModal/UpdateProductModal";
import ArchiveProductModal from "./components/ArchiveProductModal/ArchiveProductModal";
import { getProductTableColumns } from "./config/table-config";

import TableSkeleton from "@admin/app/components/TableSkeleton";
import Button from "@shared/components/ButtonV2";
import EmptyBox from "@shared/components/EmptyBox";
import GenericTable from "@shared/components/GenericTable";
import PagingButton from "@shared/components/PagingButton";
import SearchInput from "@shared/components/SearchInput";

function ProductsPage() {
  const {
    name,
    setName,
    archived,
    setArchived,
    page,
    nextPage,
    prevPage,
    products,
    isPending,
    toggleModal,
    isOpenCreateProductModal,
    isOpenDeleteProductModal,
    isOpenUpdateProductModal,
    isArchivedProductModal,
    selectedProduct,
    reloadProducts,
  } = useProductsPage();

  return (
    <div className="w-full flex flex-col h-full gap-4 overflow-y-hidden items-stretch relative">
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
          </Button>
        </div>
      </div>
      <div className="flex justify-start w-full">
        <div className="flex justify-center gap-2">
          <button
            className={`flex justify-center items-center bg-white text-theme-primary rounded-full border border-theme-primary w-8 h-8 ${
              archived === undefined ? "bg-french-gray" : "hover:bg-theme-background"
            }`}
            onClick={() => setArchived(undefined)}
          >
            <FaBars size={18} />
          </button>
          <button
            className={`flex justify-center items-center bg-white text-theme-primary rounded-full border border-theme-primary w-8 h-8 ${
              archived === false ? "bg-french-gray" : "hover:bg-theme-background"
            }`}
            onClick={() => setArchived(false)}
          >
            <LuEye size={22} />
          </button>
          <button
            className={`flex justify-center items-center bg-white text-theme-primary rounded-full border border-theme-primary w-8 h-8 ${
              archived === true ? "bg-french-gray" : "hover:bg-theme-background"
            }`}
            onClick={() => setArchived(true)}
          >
            <LuEyeOff size={22} />
          </button>
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
            columns={getProductTableColumns(toggleModal)}
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
          reloadProducts={reloadProducts}
        />
      )}

      {isOpenUpdateProductModal && (
        <UpdateProductModal
          isOpen={isOpenUpdateProductModal}
          closeModal={() => toggleModal("isOpenUpdateProductModal")}
          product={selectedProduct}
          reloadProducts={reloadProducts}
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

      {isArchivedProductModal && (
        <ArchiveProductModal
          isOpen={isArchivedProductModal}
          closeModal={() => toggleModal("isArchivedProductModal")}
          product={selectedProduct}
          reloadProducts={reloadProducts}
        />
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProductsPage), { ssr: false });
