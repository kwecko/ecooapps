import Input from "@shared/components/Input";
import { toast } from "sonner";
import Button from "@shared/components/Button";
import { PageSettings } from "@shared/interfaces/page-settings";

interface InputAmountProps {
    handleNextStep: () => void;
    amount: number;
    pricing: "UNIT" | "WEIGHT";
    setAmount: (amount: number) => void;
}

export default function InputAmount({ handleNextStep, amount, pricing, setAmount }: InputAmountProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || parseInt(value) >= 1) {
            setAmount(value ? parseInt(value) : 0);
        } else {
            toast.error("A quantidade mínima permitida é 1.");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount) {
            toast.error("A quantidade mínima permitida é 1.");
            return;
        }

        handleNextStep();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col items-stretch justify-between pt-14"
        >
            {pricing === "UNIT" && <Input
                onChange={handleChange}
                className="text-theme-primary w-full text-sm"
                type="number"
                value={amount.toString()}
                minLength={1}
                step={1}
                label="Unidades"
                inputMode="numeric"
                pattern="[0-9]*"
                required={true}
            />}
            {pricing === "WEIGHT" && <Input
                onChange={handleChange}
                className="text-theme-primary w-full text-sm"
                type="number"
                value={amount.toString()}
                minLength={1}
                step={1}
                label="Quilogramas (kg)"
                inputMode="numeric"
                pattern="[0-9]*"
                required={true}
            />}
            <Button className="px-2 py-3 bg-theme-default rounded-lg text-white
            font-semibold border-0" type="submit" title="Continuar">
                Continuar
            </Button>
        </form>
    )
}