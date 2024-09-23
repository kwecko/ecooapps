import { OfferProducts } from "@producer/app/_actions/offers/offer-products";
import { toast } from "sonner";
import Button from "@shared/components/Button";
import Loader from "@shared/components/Loader";
import { MiniTable } from "@shared/components/MiniTable";
import { useRouter } from "next/navigation";
import { formatPrice } from "./InputPrice";
import { useHandleError } from "@shared/hooks/useHandleError";
import { ModelPage } from "@shared/components/ModelPage";

import pageSettings from "./page-settings";

interface ReviewOfferProps {
  cycleId: string;
  productId: string;
  productName: string;
  amount: number;
  price: number;
  pricing: "UNIT" | "WEIGHT" | undefined;
  submitAction: () => void;
  description?: string;
}

export default function ReviewOffer(props: ReviewOfferProps) {
  const { title, subtitle } = pageSettings.review;

  const router = useRouter();

  const { handleError } = useHandleError();

  const pricing =
    props.pricing === "UNIT"
      ? props.amount === 1
        ? "unidade"
        : "unidades"
      : "kg";

  const rows = [
    {
      header: "Produto:",
      content: props.productName,
    },
    {
      header: props.pricing === "UNIT" ? "Quantidade" : "Peso:",
      content: `${props.amount} ${pricing}`,
    },
    {
      header: "Preço:",
      content: `${formatPrice(props.price * 100)} / ${
        props.pricing === "UNIT" ? "unidade" : "kg"
      }`,
    },
    {
      header: "Taxa:",
      content: `+20% = ${formatPrice(
        props.price * 100 * 0.2 + props.price * 100
      )}`,
    },
    {
      header: "Descrição:",
      content: props.description || "Sem descrição",
    },
  ];

  return (
    <ModelPage
      title={title}
      titleGap="gap-5"
      titleClassName="px-3"
      subtitleClassName="px-4"
      subtitle={subtitle}
      buttonArea={
        <Button
          title="Confirmar a oferta"
          onClick={props.submitAction}
          className="w-full h-12 bg-theme-default rounded-md text-white font-semibold text-base leading-5.5"
        >
          Confirmar a oferta
        </Button>
      }
    >
      <div className="w-full h-full flex flex-col items-stretch justify-between pt-7">
        <MiniTable.Root>
          <MiniTable.Body>
            {rows.map((row, index) => (
              <MiniTable.Row key={index}>
                <MiniTable.HeaderCell>{row.header}</MiniTable.HeaderCell>
                <MiniTable.Cell className="col-span-2">
                  {row.content}
                </MiniTable.Cell>
              </MiniTable.Row>
            ))}
          </MiniTable.Body>
        </MiniTable.Root>
      </div>
    </ModelPage>
  );
}
