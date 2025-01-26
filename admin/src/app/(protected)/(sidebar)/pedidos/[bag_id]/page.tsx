"use client";

import { IoChevronBackOutline } from "react-icons/io5";

import useBagDetailsPage from "@admin/app/(protected)/(sidebar)/pedidos/[bag_id]";

import { formatDateToDateAndTime } from "@shared/utils/date-handlers";
import { convertStatus } from "@shared/utils/convert-status";

import { OrderDTO } from "@shared/interfaces/dtos";

const BagDetailsPage = () => {
  const {
    bagDetails,
    isPending,
    paymentsPage,
    nextPaymentsPage,
    prevPaymentsPage,
    navigateToBagsList,
  } = useBagDetailsPage();

  if (!bagDetails) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2 ml-2">
            Informações do Pedido
          </h3>
          <div className="rounded-lg bg-white lg:text-theme-primary">
            <div className="p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm">Pedido:</p>
                  <p>{bagDetails.id}</p>
                </div>
                <div>
                  <p className="text-sm">Status:</p>
                  <p
                    className={`font-semibold mb-2 ${
                      convertStatus(bagDetails.status).nameColor
                    }`}
                  >
                    {convertStatus(bagDetails.status).name}
                  </p>
                </div>
                <div>
                  <p className="text-sm">Cliente:</p>
                  <p>
                    {bagDetails.user.first_name +
                      " " +
                      bagDetails.user.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm">Data:</p>
                  <p>{formatDateToDateAndTime(bagDetails.created_at)}</p>
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
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm">Preço:</p>
                  <p>R${bagDetails.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm">Taxas:</p>
                  <p>R$ --</p>
                </div>
                <div>
                  <p className="text-sm">Entrega:</p>
                  <p>R$ --</p>
                </div>
                <div>
                  <p className="text-sm">Total:</p>
                  <p className="font-semibold">
                    R${bagDetails.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2 ml-2">Conteúdo da Sacola</h3>
          <div className="rounded-lg bg-white lg:text-theme-primary">
            <div className="p-6">
              <div className="max-h-80 overflow-y-auto">
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
                            ? `${item.offer.amount}un`
                            : `${item.offer.amount}g`}{" "}
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
          <div className="rounded-lg bg-white lg:text-theme-primary"></div>
        </div>
      </div>

      <button
        className="w-fit text-white justify-center rounded-md border border-transparent bg-rain-forest px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2"
        onClick={() => navigateToBagsList()}
      >
        <IoChevronBackOutline size={20} />
        Voltar para lista
      </button>
    </div>
  );
};

export default BagDetailsPage;
