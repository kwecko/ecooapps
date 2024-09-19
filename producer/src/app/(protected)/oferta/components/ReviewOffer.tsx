import { OfferProducts } from "@producer/app/_actions/offers/offer-products";
import { toast } from "sonner";
import Button from "@shared/components/Button";
import Loader from "@shared/components/Loader";
import { MiniTable } from "@shared/components/MiniTable";
import { useRouter } from "next/navigation";
import { formatPrice } from "./InputPrice";
import { useHandleError } from "@shared/hooks/useHandleError";


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
    const router = useRouter();

    const { handleError } = useHandleError();

    const pricing = props.pricing === "UNIT" ? (
        props.amount === 1 ? "unidade" :
            "unidades"
    ) : ("kg");

    

    return (
        <div className="h-full flex flex-col items-stretch justify-between pt-14">
            <MiniTable.Root>
                <MiniTable.Body>
                    <MiniTable.Row>
                        <MiniTable.HeaderCell>Produto:</MiniTable.HeaderCell>
                        <MiniTable.Cell className="col-span-2">{props.productName}</MiniTable.Cell>
                    </MiniTable.Row>
                    <MiniTable.Row>
                        <MiniTable.HeaderCell>
                            {props.pricing === "UNIT" ? "Quantidade" : "Peso"}:
                        </MiniTable.HeaderCell>
                        <MiniTable.Cell className="col-span-2">
                            {`${props.amount} ${pricing}`}
                        </MiniTable.Cell>
                    </MiniTable.Row>
                    <MiniTable.Row>
                        <MiniTable.HeaderCell>Preço:</MiniTable.HeaderCell>
                        <MiniTable.Cell className="col-span-2">
                            {`${formatPrice(props.price * 100)} / ${props.pricing === "UNIT" ? "unidade" : "kg"}`}
                        </MiniTable.Cell>
                    </MiniTable.Row>
                    <MiniTable.Row>
                        <MiniTable.HeaderCell>Taxa:</MiniTable.HeaderCell>
                        <MiniTable.Cell className="col-span-2">+20% = {formatPrice((props.price * 100 * 0.2)+props.price * 100)}

                        </MiniTable.Cell>
                    </MiniTable.Row>
                    <MiniTable.Row>
                        <MiniTable.HeaderCell>Descrição:</MiniTable.HeaderCell>
                        <MiniTable.Cell className="col-span-2">
                            {props.description || "Sem descrição"}
                        </MiniTable.Cell>
                    </MiniTable.Row>
                </MiniTable.Body>
            </MiniTable.Root>
            <Button
                title="Confirmar a oferta"
                onClick={props.submitAction}
                className="px-2 py-3 bg-theme-default rounded-lg text-white
            font-semibold border-0">
                Confirmar a oferta
            </Button>
        </div>
    );
}