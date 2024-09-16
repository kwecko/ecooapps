import { toast } from "sonner";
import Button from "@shared/components/Button";
interface InputDescriptionProps {
    handleNextStep: () => void;
    description: string;
    setDescription: (description: string) => void;
}

export default function InputDescription({ handleNextStep, description, setDescription }: InputDescriptionProps) {

    const charCount = description.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (description.length > 200) {
            toast.error("A descrição deve ter no máximo 200 caracteres.");
            return;
        }

        handleNextStep();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col items-stretch justify-between pt-14"
        >
            <div className="relative flex flex-col text-slate-gray h-full">
                <label className="text-sm inter-font font-normal text-theme-primary pb-2">
                    Descrição
                </label>
                <textarea
                    maxLength={200}
                    value={description}
                    onChange={handleChange}
                    className="p-3 border border-theme-primary rounded-lg inter-font font-normal h-[30%]"
                />
                <p className="text-right text-slate-gray text-xs mt-1">{`${charCount}/200`}</p>
            </div>
            <Button className="px-2 py-3 bg-theme-default rounded-lg text-white
            font-semibold border-0">
                Continuar
            </Button>
        </form>
    )
}