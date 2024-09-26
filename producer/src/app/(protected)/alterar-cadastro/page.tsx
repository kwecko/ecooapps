'use client'

import { useEffect, useState } from "react";
import { EyeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { z } from "zod";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { useHandleError } from "@shared/hooks/useHandleError";
import { getUser } from "@shared/_actions/account/get-user";
import { updateUser } from "@shared/_actions/account/update-user";
import { Tooltip } from "antd";
import { toast } from "sonner";
import NewInput from "@shared/components/NewInput";
import Button from "@shared/components/Button";
import Link from "next/link";
import Modal from "@shared/components/Modal";
import { validateCellphone } from "@shared/utils";

const formSchema = z.object({
  phone: z.string().min(11, "Formato de telefone inválido.").refine((val) => validateCellphone(val), {
    message: "Formato de telefone inválido.",
  }),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres."),
  confirmPassword: z.string().min(8, "Confirmar senha deve ter pelo menos 8 caracteres."),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
});

export default function AlterarCadastro() {
  const { handleError }  = useHandleError();
  const { getFromStorage } = useLocalStorage();
  const passwordRequirements = "Sua senha deve ter pelo menos 8 caracteres."

  const [formData, setFormData] = useState(getFromStorage("register-form-data"));

  const [userInfo, setUserInfo] = useState({
    user: {
      first_name: "Nome",
      last_name: "Sobrenome",
      phone: "(XX) XXXXX-XXXX",
      email: "Email",
      cpf: "XXX.XXX.XXX-XX",
    },
  });

  const preventDefault = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    (async () => {
      await getUser().then((response) => {
        if (response.message) {
          const messageError = response.message;
          handleError(messageError)
        } else if (response.data) {
          const { first_name, last_name, phone, email, cpf } = response.data;
          setUserInfo((prevState) => ({
            ...prevState,
            user: {
              ...prevState.user,
              first_name: first_name || prevState.user.first_name,
              last_name: last_name || prevState.user.last_name,
              phone: phone || prevState.user.phone,
              email: email || prevState.user.email,
              cpf: cpf || prevState.user.cpf,
            }
          }));
        }
      }).catch((error) => {
        toast.error(error)
      })
    })();
  }, []);

  const getUpdatedData = (newData: any, currentData: any) => {
    const updatedData = { ...currentData };
    Object.keys(newData).forEach((key) => {
      if (newData[key] !== "") {
        updatedData[key] = newData[key];
      }
    });
    return updatedData;
  };

  const handleSubmit = async (data: any) => {

    if (!data) {
      toast.error("Preencha os campos obrigatórios.");
    } else {
    data = getUpdatedData(getFromStorage("register-form-data"), userInfo.user);
    
    const validation = formSchema.safeParse(data);

    if (!data.password) {
      toast.error("Senha deve ter pelo menos 8 caracteres.");
      return;
    } else if (!validation.success) {
      toast.error(validation.error.errors[0].message);
    } else {
      await updateUser(data)
        .then((response) => {
          if (response?.message) {
            handleError(response.message);
            return;
          } else {
            toast.success("Cadastro atualizado com sucesso!");
            localStorage.removeItem("register-form-data");
            window.location.href = "/";
          }
        }).catch((error) => {
          toast.error(error)
        });
      }  
    } 
  }

  return(
    <>
      <div className="w-full h-screen p-5 flex items-center flex-col bg-theme-background" onSubmit={preventDefault}>
        <div className="flex flex-col w-full items-center justify-end">
          <h1 className="text-3xl font-medium text-slate-gray">Seu perfil</h1>
          <span className="text-sm font-medium text-slate-gray text-center mt-2">
            Após atualizar os seus dados, <br /> clique em salvar.
          </span>
        </div>
        <div className="w-full h-[85vh] flex flex-col mt-10">
          <form onSubmit={preventDefault} className="w-full h-full flex flex-col justify-between">
            <div className="w-full flex flex-col gap-2">
              <NewInput
                name="first_name"
                placeholder={userInfo.user.first_name}
                label="Nome"
                type="text"
                initialValue={formData?.first_name}
                localStorageFormKey="register-form-data"
              />
              <NewInput
                name="last_name"
                placeholder={userInfo.user.last_name}
                label="Sobrenome"
                type="text"
                initialValue={formData?.last_name}
                localStorageFormKey="register-form-data"
              />
              <NewInput
                name="email"
                placeholder={userInfo.user.email}
                label="Email"
                type="email"
                initialValue={formData?.email}
                className="cursor-not-allowed"
                disabled={true}
              />
              <NewInput
                name="phone"
                placeholder={userInfo.user.phone}
                label="Telefone"
                type="number"
                initialValue={formData?.phone}
                localStorageFormKey="register-form-data"
              />
              <NewInput
                name="password"
                placeholder="********"
                label={
                  (
                    <>
                      Nova senha *
                      <Tooltip title={passwordRequirements}>
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)", marginLeft: 10 }}
                        />
                      </Tooltip>
                    </>
                  ) as unknown as Element
                }
                icon={<EyeOutlined />}
                type="password"
                initialValue={formData?.password}
                localStorageFormKey="register-form-data"
              />
              <NewInput
                name="confirmPassword"
                placeholder="********"
                label={
                  (
                    <>
                      Confirmar senha *
                      <Tooltip title={passwordRequirements}>
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)", marginLeft: 10 }}
                        />
                      </Tooltip>
                    </>
                  ) as unknown as Element
                }
                icon={<EyeOutlined />}
                type="password"
                initialValue={formData?.confirmPassword}
                localStorageFormKey="register-form-data"
              />
            </div>

            <div className="w-full p-5 flex gap-3 z-10 px-2 py-1 bg-transparent">
              <Link className="w-full" href={"/"}>
                <Button className="w-full rounded-lg bg-white font-semibold text-slate-gray border-slate-gray border-2 py-4 hover:bg-gray-100">
                  Voltar
                </Button>
              </Link>
              <Modal
                titleContentModal="Você tem certeza?"
                contentModal="Ao clicar em confirmar seus dados de cadastro serão atualizados."
                titleCloseModal="Cancelar"
                titleConfirmModal="Confirmar"
                titleOpenModal="Salvar"
                bgOpenModal="#2F4A4D"
                bgConfirmModal="#2F4A4D"
                bgCloseModal="bg-gray-100"
                modalAction={() => handleSubmit(getFromStorage("register-form-data"))}
              />         
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
