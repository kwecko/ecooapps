import { forwardRef } from "react";
import { AiOutlineEye } from "react-icons/ai";

import CustomInput from "@shared/components/CustomInput";

import { useChangePasswordForm } from "./useChangePasswordForm";

interface ChangePasswordFormProps {
  token: string;
}

const ChangePasswordForm = forwardRef<HTMLFormElement, ChangePasswordFormProps>(
  ({ token }, ref) => {
    const { errors, register, handleSubmit, handleSubmitForm } =
      useChangePasswordForm(token);

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(handleSubmitForm)}
        className="mt-7.5 pb-14 gap-3.5 w-full h-full overflow-y-auto flex flex-col items-center justify-between"
      >
        <div className="w-full flex flex-col gap-3.5">
          <CustomInput
            register={{ ...register("password") }}
            placeholder="Digite sua senha"
            label="Nova senha"
            icon={<AiOutlineEye />}
            type="password"
            errorMessage={errors.password?.message}
          />
          <CustomInput
            register={{ ...register("confirmPassword") }}
            placeholder="Digite sua senha"
            label="Confirmar senha"
            icon={<AiOutlineEye />}
            type="password"
            errorMessage={errors.confirmPassword?.message}
          />
        </div>
      </form>
    );
  }
);

ChangePasswordForm.displayName = "ChangePasswordForm";

export default ChangePasswordForm;
