import { forwardRef } from "react";
import { AiOutlineEye } from "react-icons/ai";

import Input from "@shared/components/Input";

import { useChangePasswordForm } from "./useChangePasswordForm";

interface ChangePasswordFormProps {
  token: string;
}

const ChangePasswordForm = forwardRef<HTMLFormElement, ChangePasswordFormProps>(
  ({ token }, ref) => {
    const { register, handleSubmit, handleSubmitForm } =
      useChangePasswordForm(token);

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(handleSubmitForm)}
        className="mt-7.5 pb-14 gap-3.5 w-full h-full overflow-y-auto flex flex-col items-center justify-between"
      >
        <div className="w-full flex flex-col gap-3.5">
          <Input
            register={{ ...register("password") }}
            placeholder="Digite sua senha"
            label="Nova senha"
            icon={<AiOutlineEye />}
            type="password"
          />
          <Input
            register={{ ...register("confirmPassword") }}
            placeholder="Digite sua senha"
            label="Confirmar senha"
            icon={<AiOutlineEye />}
            type="password"
          />
        </div>
      </form>
    );
  }
);

ChangePasswordForm.displayName = "ChangePasswordForm";

export default ChangePasswordForm;
