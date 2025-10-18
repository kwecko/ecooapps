import Button from "@shared/components/Button";
import { MiniTable } from "@shared/components/MiniTable";
import { ModelPage } from "@shared/components/ModelPage";
import { addTaxToPrice } from "@shared/utils/convert-tax";
import { convertUnitFull } from "@shared/utils/convert-unit";
import { formatPrice } from "@shared/utils/format-price";

import pageSettings from "./page-settings";

interface ReviewOfferProps {
  productId: string;
  productName: string;
  amount: number;
  expiration_date: Date | undefined;
  price: number;
  pricing: "UNIT" | "WEIGHT" | undefined;
  expires_at: Date | undefined;
  submitAction: () => void;
  description?: string;
  comment?: string;
  closes_at: Date
  recurring?: string;
}

export default function ReviewOffer(props: ReviewOfferProps) {
  const { title, subtitle } = pageSettings.review;

  const rows = []

  rows.push({
    header: "Produto:",
    content: props.productName,
  });

  rows.push({
    header: "Quantidade:",
    content: `${props.amount} ${convertUnitFull(
      props.pricing || "",
      props.amount > 1
    )}`,
  });

  if (props.expiration_date) {
    const formatDate = (date: Date | undefined): string | undefined => {
      if (!date) return undefined;
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) return undefined;
      const day = String(parsedDate.getDate()).padStart(2, "0");
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const year = parsedDate.getFullYear();
      return `${day}/${month}/${year}`;
    };

    rows.push({
      header: "Data de validade:",
      content: formatDate(props.expiration_date),
    });
  }

  rows.push({
    header: "Preço de custo:",
    content: `${formatPrice(props.price)} / ${convertUnitFull(
      props.pricing || ""
    )}`,
  });

  rows.push({
    header: "Preço de venda (+20%):",
    content: `${formatPrice(addTaxToPrice(props.price, 0.2))}`,
  });

  rows.push({
    header: "Descrição:",
    content: props.description || "Sem descrição",
  });

  rows.push({
    header: "Comentário:",
    content: props.comment || "Sem comentário",
  });

  rows.push({
    header: "Recorrente?",
    content:
      props.recurring === "true"
        ? "Sim"
        : props.recurring === "false" 
        ? "Não"
        : props.closes_at
        ? "Não"
        : "Sim",
  });

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
      <div className="w-full h-full flex flex-col items-stretch justify-between pt-7 overflow-y-auto">
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
