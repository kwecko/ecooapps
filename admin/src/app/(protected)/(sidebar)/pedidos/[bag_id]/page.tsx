'use client';

import { useEffect, useState } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';

import useBagDetailsPage from '@admin/app/(protected)/(sidebar)/pedidos/[bag_id]';
import Title from '@admin/app/components/Title';
import { getBagDetailsTableColumns } from './config/table-config';

import { convertStatus } from '@shared/utils/convert-status';
import { formatDateToDateAndTime } from '@shared/utils/date-handlers';
import { formatPrice } from '@shared/utils/format-price';

import { HandleBagRequest } from "@admin/_actions/bags/handle-bag";
import TableSkeleton from '@admin/app/components/TableSkeleton';

import Button from '@shared/components/Button';
import EmptyBox from '@shared/components/EmptyBox';
import GenericTable from '@shared/components/GenericTable';
import ModalV2 from '@shared/components/ModalV2';
import Select from '@shared/components/SelectInput';
import CreatePaymentModal from './components/CreatePaymentModal';
import EditPaymentModal from './components/EditPaymentModal';

import { OrderDTO } from '@shared/interfaces/dtos';

const BagDetailsPage = () => {
  const {
    bagDetails,
    isPending,
    createPaymentModalIsOpen,
    paymentModalIsOpen,
    selectedPayment,
    loadingCreatePayment,
    loadingUpdatePayment,
    handleBagStatus,
    navigateToBagsList,
    selectBagPayment,
    createNewPayment,
    closePaymentModal,
    editSelectedPayment,
    updateSelectedPayment,
    startNewPayment,
  } = useBagDetailsPage();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const options =
    bagDetails?.status === 'PENDING' || bagDetails?.status === 'CANCELLED'
      ? [
          { value: 'CANCELLED', label: convertStatus('CANCELLED').name },
        ]
      : [
          { value: 'PENDING', label: convertStatus('PENDING').name },
          { value: 'VERIFIED', label: convertStatus('VERIFIED').name },
          { value: 'MOUNTED', label: convertStatus('MOUNTED').name },
          { value: 'CANCELLED', label: convertStatus('CANCELLED').name },
          { value: 'RECEIVED', label: convertStatus('RECEIVED').name },
          { value: 'DISPATCHED', label: convertStatus('DISPATCHED').name },
          { value: 'DEFERRED', label: convertStatus('DEFERRED').name },
        ];

useEffect(() => {
  if (bagDetails?.status) {
    setSelectedStatus(bagDetails.status);
  }
}, [bagDetails?.status]);


  if (!bagDetails) return null;

  return (
    <>
      <div className='w-full h-[105%] overflow-auto flex flex-col gap-6'>
        <Title>Detalhes dos Pedidos</Title>
        <div className='grid grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-medium mb-2 ml-2'>
              Informações do Pedido
            </h3>
            <div className='rounded-lg bg-white lg:text-theme-primary'>
              <div className='p-6'>
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <p className='text-sm font-medium w-32'>Pedido:</p>
                    <p className='flex-1'>{bagDetails.code}</p>
                  </div>
                    <div className='flex justify-between items-center'>
                      <p className='text-sm font-medium w-32'>Status:</p>
                      {bagDetails.status !== 'CANCELLED' ? (
                        <div className="flex w-full pl-4">
                          <Select
                            options={options}
                            defaultOption={{
                              value: bagDetails.status,
                              label: convertStatus(bagDetails.status).name,
                            }}
                            onChange={(value) => {
                              setSelectedStatus(value);
                              setIsOpen(true);
                            }}
                            placeholder="Selecione..."
                            disabled={false}
                          />
                          <ModalV2
                            isOpen={isOpen}
                            closeModal={() => setIsOpen(false)}
                            className="w-152 text-coal-black"
                            title="Alterar Status do Pedido"
                            iconClose={false}
                          >
                            <div className="rounded-lg lg:text-theme-primary">
                              <div className="flex flex-col gap-2 pt-5 pb-5 pr-10 pl-10">
                                Você confirma que quer trocar o status da sacola de "{convertStatus(bagDetails.status).name}" para "{convertStatus(selectedStatus as HandleBagRequest["status"]).name}"?
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button
                                className="w-full text-rain-forest justify-center rounded-md border border-transparent bg-white px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2"
                                onClick={() => setIsOpen(false)}
                              >
                                Cancelar
                              </button>
                              <button
                                className="w-full text-white justify-center rounded-md border border-transparent bg-rain-forest px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2"
                                onClick={() => {
                                  handleBagStatus(selectedStatus as HandleBagRequest["status"]);
                                  setIsOpen(false);
                                }}
                              >
                                Salvar
                              </button>
                            </div>
                          </ModalV2>
                        </div>
                      ) : (
                        <span className="flex-1">{convertStatus(bagDetails.status).name}</span>
                      )}
                    </div>
                  <div className='flex justify-between items-center'>
                    <p className='text-sm font-medium w-32'>Cliente:</p>
                    <p className='flex-1'>
                      {bagDetails.customer
                        ? bagDetails.customer.first_name +
                          ' ' +
                          bagDetails.customer.last_name
                        : 'Consumidor avulso'}
                    </p>
                  </div>
                  {bagDetails.customer && (
                    <>
                      <div className='flex justify-between items-center'>
                        <p className='text-sm font-medium w-32'>Email:</p>
                        <p className='flex-1'>{bagDetails.customer.email}</p>
                      </div>
                      <div className='flex justify-between items-center'>
                        <p className='text-sm font-medium w-32'>Cpf:</p>
                        <p className='flex-1'>{bagDetails.customer.cpf}</p>
                      </div>
                      <div className='flex justify-between items-center'>
                        <p className='text-sm font-medium w-32'>Telefone:</p>
                        <p className='flex-1'>{bagDetails.customer.phone}</p>
                      </div>
                    </>
                  )}
                  <div className='flex justify-between items-center'>
                    <p className='text-sm font-medium w-32'>Data:</p>
                    <p className='flex-1'>
                      {formatDateToDateAndTime(bagDetails.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Value */}
          <div>
            <h3 className='text-lg font-medium mb-2 ml-2'>Valor do Pedido</h3>
            <div className='rounded-lg bg-white lg:text-theme-primary'>
              <div className='p-6'>
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between items-center'>
                    <p className='text-sm font-medium w-32'>Preço:</p>
                    <p className='flex-1'>{formatPrice(bagDetails.subtotal)}</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='text-sm font-medium w-32'>Taxas:</p>
                    <p className='flex-1'>{formatPrice(bagDetails.fee)}</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='text-sm font-medium w-32'>Entrega:</p>
                    <p className='flex-1'>{formatPrice(bagDetails.shipping)}</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='text-sm font-medium w-32'>Total:</p>
                    <p className='font-semibold flex-1'>
                      {formatPrice(bagDetails.total)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-medium mb-2 ml-2'>
              Conteúdo da Sacola
            </h3>
            <div className='rounded-lg bg-white lg:text-theme-primary h-72'>
              <div className='p-6'>
                <div className='h-56 overflow-y-auto pr-6'>
                  {bagDetails.orders
                    .reduce<
                      {
                        id: string;
                        name: string;
                        items: OrderDTO[];
                      }[]
                    >((farms, item) => {
                      const farmId = item.offer.farm.id;
                      const farmName = item.offer.farm.name;
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
                      <div key={farm.id} className='mb-4'>
                        <h3 className='font-semibold mb-2'>{farm.name}</h3>
                        <div className='flex flex-col gap-2'>
                          {farm.items.map((item, index) => (
                            <div key={index} className='flex items-start'>
                              <span className='flex-1 text-sm leading-tight mr-2'>
                                {item.offer.product.pricing === 'UNIT'
                                  ? `${item.amount}un`
                                  : `${item.amount}g`}{' '}
                                - {item.offer.product.name}
                              </span>
                              <div
                                title={
                                  item.status === 'RECEIVED'
                                    ? 'Entregue'
                                    : item.status === 'REJECTED'
                                    ? 'Retornado'
                                    : 'Pendente'
                                }
                                className={`w-5 h-5 flex items-center justify-center rounded-full text-white text-xs flex-shrink-0
                                  ${
                                    item.status === 'RECEIVED'
                                      ? 'bg-green-500'
                                      : item.status === 'REJECTED'
                                      ? 'bg-red-500'
                                      : 'bg-gray-400'
                                  }`}
                              >
                                {item.status === 'RECEIVED' && '✔'}
                                {item.status === 'REJECTED' && '✖'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-medium mb-2 ml-2'>Pagamentos</h3>
            <div className='rounded-lg bg-white lg:text-theme-primary h-72'>
              {isPending && <TableSkeleton />}

              {!isPending && !bagDetails.payment && (
                <div className='flex-grow flex flex-col h-full pt-6'>
                  <EmptyBox type='payment' />
                  <div className='flex flex-col justify-center items-center h-full pr-18 pl-18 gap-3'>
                    <Button
                      onClick={() => startNewPayment()}
                      disabled={bagDetails.status === 'CANCELLED'}
                      className='w-full text-white justify-center rounded-md border border-transparent bg-rain-forest px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
                    >
                      Adicionar forma de pagamento
                    </Button>
                    {bagDetails.status === 'CANCELLED' && (
                      <p className='text-sm text-gray-500 text-center'>
                        Não é possível adicionar forma de pagamento para pedidos cancelados.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {!isPending && bagDetails.payment && (
                <GenericTable
                  data={[bagDetails.payment]}
                  columns={getBagDetailsTableColumns({
                    selectBagPayment,
                  })}
                  gridColumns={1}
                />
              )}
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <button
            className='w-fit text-white justify-center rounded-md border border-transparent bg-rain-forest px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2'
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
