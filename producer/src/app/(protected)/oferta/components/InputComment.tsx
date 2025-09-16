import { toast } from "sonner";
import Button from "@shared/components/Button";
import { ModelPage } from "@shared/components/ModelPage";

import pageSettings from "./page-settings";

interface InputCommentProps {
  handleNextStep: () => void;
  comment: string;
  setComment: (comment: string) => void;
}

export default function InputComment({
  handleNextStep,
  comment,
  setComment,
}: InputCommentProps) {
  const { title, subtitle } = pageSettings.comment;

  const charCount = comment.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.length > 200) {
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
      <div className="w-full h-full relative flex flex-col text-slate-gray pt-5">
        <label className="text-sm inter-font font-normal text-theme-primary pb-2">
          Comentário para o time interno e-COO
        </label>
        <textarea
          maxLength={200}
          value={comment}
          onChange={handleChange}
          className="p-3 border border-theme-primary rounded-lg inter-font font-normal h-48"
          placeholder="Deixe aqui algum comentário para o time interno da e-COO. Ex.: Produto fornecido pelo produtor Fulano."
        />
        <p className="text-right text-slate-gray text-xs mt-1">{`${charCount}/200`}
        </p>
      </div>
      
    </ModelPage>
  );
}
