"use client";
import { useRouter } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";

export default function RegisterStep3() {
  const router = useRouter();

  const handleConfirmation = () => {
    localStorage.setItem("register-form-step", JSON.stringify(4));

    router.push("/login");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex justify-center items-center w-[100px] h-[100px] rounded-full bg-rain-forest text-white">
          <AiOutlineMail size={64} />
        </div>
        <span className="mt-6 text-center text-3xl leading-[34px] font-medium text-slate-gray">
          Verifique o <br /> seu e-mail!
        </span>
        <span className="mt-4 text-center font-medium text-sm text-slate-gray">
          O seu cadastro como produtor <br /> está quase concluído.
        </span>
        <span className="mt-4 text-center font-medium text-sm text-slate-gray">
          Abra o seu e-mail em <br /> uma nova guia para confirmar <br /> seu
          cadastro.
        </span>
      </div>
      <div className="flex flex-col w-full">
        <button
          className="flex justify-center w-full py-[10px] border-2 rounded-[6px] text-base leading-[22px] tracking-tight font-semibold bg-slate-gray text-white border-slate-gray"
          onClick={handleConfirmation}
        >
          OK
        </button>
      </div>
    </>
  );
}
