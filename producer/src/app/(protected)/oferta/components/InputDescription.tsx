import { toast } from "sonner";
import Button from "@shared/components/Button";
import { ModelPage } from "@shared/components/ModelPage";

import pageSettings from "./page-settings";

interface InputDescriptionProps {
  handleNextStep: () => void;
  description: string;
  setDescription: (description: string) => void;
  comment: string;
  setComment: (comment: string) => void;
}

export default function InputDescription({
  handleNextStep,
  description,
  setDescription,
  comment,
  setComment,
}: InputDescriptionProps) {
  const { title, subtitle } = pageSettings.description;

  const charCountDescription = description.length;
  const charCountComment = comment.length;

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (description.length > 100) {
      toast.error("A descrição deve ter no máximo 200 caracteres.");
      return;
    }

    if (comment.length > 100) {
      toast.error("O comentário deve ter no máximo 200 caracteres.");
      return;
    }

    handleNextStep();
  };

  return (
    <ModelPage
      title={title}
      titleGap="gap-5"
      subtitleClassName="px-5"
      subtitle={subtitle}
      buttonArea={
        <Button
          className="w-full h-12 bg-theme-default rounded-md text-white font-semibold text-base leading-5.5"
          type="submit"
          onClick={handleSubmit}
          title="Continuar"
        >
          Continuar
        </Button>
      }
    >
      <div className="w-full relative flex flex-col text-slate-gray pt-5">
        <label className="text-sm inter-font font-normal text-theme-primary pb-2">
          Descrição para o Consumidor
        </label>
        <textarea
          maxLength={100}
          value={description}
          onChange={handleChangeDescription}
          className="p-3 border border-theme-primary rounded-lg inter-font font-normal h-28"
          placeholder={`Escreva aqui as características do produto e demais informações que serão exibidas para o consumidor. 
Ex.: Pote de geleia caseira de pimenta. Comercializado em um vidro de 400g. Produto artesanal e sem conservantes.`}
        />
        <p className="text-right text-slate-gray text-xs mt-1">{`${charCountDescription}/100`}
        </p>
      </div>

      <div className="w-full h-full relative flex flex-col text-slate-gray">
        <label className="text-sm inter-font font-normal text-theme-primary">
          Comentário para o time interno e-COO
        </label>
        <textarea
          maxLength={100}
          value={comment}
          onChange={handleChangeComment}
          className="p-3 border border-theme-primary rounded-lg inter-font font-normal h-28"
          placeholder="Deixe aqui algum comentário para o time interno da e-COO. Ex.: Produto fornecido pelo produtor Fulano."
        />
        <p className="text-right text-slate-gray text-xs mt-1">{`${charCountComment}/100`}
        </p>
      </div>
      
    </ModelPage>
  );
}
