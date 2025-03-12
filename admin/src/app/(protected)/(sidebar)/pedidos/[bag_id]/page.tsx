"use client";

import { IoChevronBackOutline } from "react-icons/io5";

import useBagDetailsPage from "@admin/app/(protected)/(sidebar)/pedidos/[bag_id]";
import Title from "@admin/app/components/Title";
import { getBagDetailsTableColumns } from "./config/table-config";

import { formatDateToDateAndTime } from "@shared/utils/date-handlers";
import { formatPrice } from "@shared/utils/format-price";
import { convertStatus } from "@shared/utils/convert-status";

import TableSkeleton from "@admin/app/components/TableSkeleton";
import EmptyBox from "@shared/components/EmptyBox";
import GenericTable from "@shared/components/GenericTable";
import PagingButton from "@shared/components/PagingButton";

import EditPaymentModal from "./components/EditPaymentModal";
import CreatePaymentModal from "./components/CreatePaymentModal";

import { OrderDTO } from "@shared/interfaces/dtos";
import Button from "@shared/components/Button";

const BagDetailsPage = () => {
  const {
    bagDetails,
    isPending,
    paymentsPage,
    createPaymentModalIsOpen,
    paymentModalIsOpen,
    selectedPayment,
    loadingCreatePayment,
    loadingUpdatePayment,
    nextPaymentsPage,
    prevPaymentsPage,
    navigateToBagsList,
    selectBagPayment,
    createNewPayment,
    closePaymentModal,
    editSelectedPayment,
    updateSelectedPayment,
    startNewPayment,
  } = useBagDetailsPage();

  if (!bagDetails) return null;

  const tax = bagDetails.price * (bagDetails.orders[0].offer.catalog.farm.tax) / 100;
  return (
    <>
      <div className="w-full h-[105%] overflow-auto flex flex-col gap-6">
        <Title>Detalhes dos Pedidos</Title>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2 ml-2">
              Informações do Pedido
            </h3>
            <div className="rounded-lg bg-white lg:text-theme-primary">
              <div className="p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium w-32">Pedido:</p>
                    <p className="flex-1">{bagDetails.id}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium w-32">Status:</p>
                    <p
                      className={`flex-1 font-semibold ${
                        convertStatus(bagDetails.status).nameColor
                      }`}
                    >
                      {convertStatus(bagDetails.status).name}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium w-32">Cliente:</p>
                    <p className="flex-1">
                      {bagDetails.user.first_name +
                        " " +
                        bagDetails.user.last_name}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium w-32">Email:</p>
                    <p className="flex-1">
                      {bagDetails.user.email}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium w-32">Cpf:</p>
                    <p className="flex-1">
                      {bagDetails.user.cpf}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium w-32">Data:</p>
                    <p className="flex-1">
                      {formatDateToDateAndTime(bagDetails.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Value */}
          <div>
            <h3 className="text-lg font-medium mb-2 ml-2">Valor do Pedido</h3>
            <div className="rounded-lg bg-white lg:text-theme-primary">
              <div className="p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium w-32">Preço:</p>
                    <p className="flex-1">{formatPrice(bagDetails.price - tax)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium w-32">Taxas:</p>
                    <p className="flex-1">{formatPrice(tax)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium w-32">Entrega:</p>
                    <p className="flex-1">R$ --</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium w-32">Total:</p>
                    <p className="font-semibold flex-1">
                      {formatPrice(bagDetails.price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2 ml-2">
              Conteúdo da Sacola
            </h3>
            <div className="rounded-lg bg-white lg:text-theme-primary h-72">
              <div className="p-6">
                <div className="h-56 overflow-y-auto">
                  {bagDetails.orders
                    .reduce<
                      {
                        id: string;
                        name: string;
                        items: OrderDTO[];
                      }[]
                    >((farms, item) => {
                      const farmId = item.offer.catalog.farm.id;
                      const farmName = item.offer.catalog.farm.name;
                      const farm = farms.find((farm) => farm.id === farmId);

                      if (farm) {
                        farm.items.push(item);
                      } else {
                        farms.push({
                          id: farmId,
                          name: farmName,
                          items: [item],
                        });
                      }

                      return farms;
                    }, [])
                    .map((farm) => (
                      <div key={farm.id} className="mb-4">
                        <h3 className="font-semibold mb-2">{farm.name}</h3>
                        {farm.items.map((item, index) => (
                          <p key={index} className="text-sm">
                            {item.offer.product.pricing === "UNIT"
                              ? `${item.amount}un`
                              : `${item.amount}g`}{" "}
                            - {item.offer.product.name}
                          </p>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2 ml-2">Pagamentos</h3>
            <div className="rounded-lg bg-white lg:text-theme-primary h-72">
              {isPending && <TableSkeleton />}

              {!isPending && bagDetails.payments.length === 0 && (
                <div className="flex-grow flex flex-col h-full pt-6">
                  <EmptyBox type="payment" />
                  <div className="flex justify-center items-center h-full pr-18 pl-18">
                    <Button
                      onClick={() => startNewPayment()}
                      className="w-full text-white justify-center rounded-md border border-transparent bg-rain-forest px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2"
                    >
                      Adicionar forma de pagamento
                    </Button>
                  </div>
                </div>
              )}

              {!isPending && bagDetails.payments.length > 0 && (
                <GenericTable
                  data={bagDetails.payments}
                  columns={getBagDetailsTableColumns({
                    selectBagPayment,
                  })}
                  gridColumns={1}
                />
              )}

              {!isPending && bagDetails.payments.length > 0 && (
                <div className="flex justify-center items-center mt-4">
                  <PagingButton
                    value={paymentsPage}
                    nextPage={nextPaymentsPage}
                    backPage={prevPaymentsPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <button
            className="w-fit text-white justify-center rounded-md border border-transparent bg-rain-forest px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2"
            onClick={() => navigateToBagsList()}
          >
            <IoChevronBackOutline size={20} />
            Voltar para lista
          </button>
        </div>
      </div>

      {paymentModalIsOpen && (
        <EditPaymentModal
          isOpen={paymentModalIsOpen}
          bag={bagDetails}
          payment={selectedPayment}
          loading={loadingUpdatePayment}
          closeModal={() => closePaymentModal()}
          editPayment={editSelectedPayment}
          updatePayment={updateSelectedPayment}
        />
      )}

      {createPaymentModalIsOpen && (
        <CreatePaymentModal
          isOpen={createPaymentModalIsOpen}
          bag={bagDetails}
          loading={loadingCreatePayment}
          createNewPayment={createNewPayment}
          closeModal={() => closePaymentModal()}
        />
      )}
    </>
  );
};

export default BagDetailsPage;
