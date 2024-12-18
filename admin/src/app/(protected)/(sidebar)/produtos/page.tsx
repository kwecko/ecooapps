"use client";

import dynamic from "next/dynamic";
import { FaPlus } from "react-icons/fa6";

import Title from "@admin/app/components/Title";
import { getProductTableColumns } from "./config/table-config";
import ProductModal from "./components/ProductModal/ProductModal";
import useProductsPage from "@admin/app/(protected)/(sidebar)/produtos";
import DeleteProductModal from "./components/DeleteProductModal/DeleteProductModal";

import Button from "@shared/components/ButtonV2";
import EmptyBox from "@shared/components/EmptyBox";
import SearchInput from "@shared/components/SearchInput";
import GenericTable from "@shared/components/GenericTable";
import PagingButton from "@shared/components/PagingButton";
import TableSkeleton from "@admin/app/components/TableSkeleton";

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
    selectedProduct
  } = useProductsPage();

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
            onClick={() => toggleModal('isOpenCreateProductModal')} 
          >
            Cadastrar produto
            <FaPlus size={18} />
          </Button>
        </div>
      </div>

      <div className="w-full h-full flex flex-col gap-5 overflow-auto justify-between items-center">
        {isPending && (
          <TableSkeleton />
        )}

        {!isPending && name && products.length === 0 && <EmptyBox type="search" />}

        {!isPending && products.length > 0 && (
          <GenericTable
            data={products}
            columns={getProductTableColumns(imageLoader, toggleModal)}
            gridColumns={16}
            noDataMessage="Nenhum produto encontrado."
          />
        )}

        {!isPending && products.length > 0 && (
          <PagingButton value={page} nextPage={nextPage} backPage={prevPage} />
        )}
      </div>

      {isOpenCreateProductModal && 
        <ProductModal 
          isOpen={isOpenCreateProductModal} 
          closeModal={() => toggleModal('isOpenCreateProductModal')} 
          product={selectedProduct}
          imageLoader={imageLoader}
        />
      }

      {isOpenDeleteProductModal &&
        <DeleteProductModal 
          isOpen={isOpenDeleteProductModal}
          closeModal={() => toggleModal('isOpenDeleteProductModal')}
          product={selectedProduct}
        />
      }
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProductsPage), { ssr: false });
