'use client'

import Button from "@shared/components/Button";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { AiFillEye } from "react-icons/ai";
import { getUser } from "@producer/app/_actions/get-user/getUser";
import { updateInfoFieldsSchema } from "./schemas";
import Input from "./components/Input";
import ConfirmationModal from "./components/ConfirmationModal";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useHandleError } from "@shared/hooks/useHandleError";
import { toast } from "sonner";

export default function AlterarCadastro() {
  const preventDefault = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const { handleError } = useHandleError()

  const [userInfo, setUserInfo] = useState({
    user: {
      firstName: "Nome",
      lastName: "Sobrenome",
      phone: "(XX) XXXXX-XXXX",
      email: "Email",
      cpf: "XXX.XXX.XXX-XX",
    },
    field: {
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    }
  });

  const passwordRequirements = "Sua senha deve ter pelo menos 8 caracteres.";

  useEffect(() => {
    (async () => {
      await getUser()
        .then((response) => {
          if (response.message) {
            const messageError = response.message;
            handleError(messageError)
          } else if (response.data) {
            const { first_name, last_name, phone, email, cpf } = response.data;
            setUserInfo((prevState) => ({
              user: {
              firstName: first_name || prevState.user.firstName,
              lastName: last_name || prevState.user.lastName,
              phone: phone || prevState.user.phone,
              email: email || prevState.user.email,
              cpf: cpf || prevState.user.cpf,
              },
              field: {
              ...prevState.field
              }
            }));
          }
        })
        .catch((error) => {
          toast.error(error)
        })
    })()
  }, [])
  
  return (
    <div className="w-full h-screen p-5 flex items-center flex-col bg-theme-background">
      <div className="flex flex-col h-1/5 w-full items-center justify-end">
        <h1 className="text-3xl font-medium text-slate-gray">Seu perfil</h1>
        <span className="text-sm font-medium text-slate-gray text-center mt-2">
          Após atualizar os seus dados, <br /> clique em salvar.
        </span>
      </div>
      <div className="w-full h-4/5 flex flex-col mt-10">
        <form className="w-full h-full flex flex-col justify-between" onSubmit={preventDefault}>
          <div className="w-full flex flex-col gap-1">
            <Input
              label="Name"
              type="text"
              value={userInfo.field.firstName}
              placeholder={userInfo.user.firstName}
              validationSchema={updateInfoFieldsSchema.firstName}
              onChange={(e) => setUserInfo(prevState => ({
                ...prevState,
                field: {
                  ...prevState.field,
                  firstName: e.target.value
                }
              }))}
            />

            <Input
              label="Sobrenome"
              type="text"
              value={userInfo.field.lastName}
              placeholder={userInfo.user.lastName}
              validationSchema={updateInfoFieldsSchema.lastName}
              onChange={(e) => setUserInfo(prevState => ({
                ...prevState,
                field: {
                  ...prevState.field,
                  lastName: e.target.value
                }
              }))}
            />

            <Input
              label="Email"
              type="email"
              placeholder={userInfo.user.email}
              validationSchema={updateInfoFieldsSchema.email}
              readOnly
            />

            <Input
              label="Telefone"
              type="number"
              value={userInfo.field.phone}
              placeholder={userInfo.user.phone}
              validationSchema={updateInfoFieldsSchema.phone}
              onChange={(e) => setUserInfo(prevState => ({
                ...prevState,
                field: {
                  ...prevState.field,
                  phone: e.target.value
                }
              }))}
            />

            <Input
              label={
                (
                  <>
                    Nova senha
                    <Tooltip title={passwordRequirements}>
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)", marginLeft: 10 }}
                      />
                    </Tooltip>
                  </>
                ) as unknown as Element
              }
              type="password"
              value={userInfo.field.password}
              icon={<AiFillEye />}
              placeholder="******"
              validationSchema={updateInfoFieldsSchema.password}
              onChange={(e) => setUserInfo(prevState => ({
                ...prevState,
                field: {
                  ...prevState.field,
                  password: e.target.value
                }
              }))}
            />

            <Input
              label="Confirmar senha"
              type="password"
              value={userInfo.field.confirmPassword}
              icon={<AiFillEye />}
              placeholder="******"
              validationSchema={updateInfoFieldsSchema.confirmPassword}
              onChange={(e) => setUserInfo(prevState => ({
                ...prevState,
                field: {
                  ...prevState.field,
                  confirmPassword: e.target.value
                }
              }))}
            />
          </div>

          <div className="w-full flex gap-1 items-end">
            <Link className="w-full" href={"/"}>
              <Button className="w-full rounded-lg font-semibold text-slate-gray border-slate-gray border-2 py-[10px]">
                Voltar
              </Button>
            </Link>

            <ConfirmationModal
              info={{
                firstName: userInfo.field.firstName,
                lastName: userInfo.field.lastName,
                phone: userInfo.field.phone,
                password: userInfo.field.password,
                email: userInfo.user.email,
                cpf: userInfo.user.cpf,
              }}
              openButton={
                <Button
                  className={`px-2 py-3 w-full rounded-lg font-inter font-semibold text-white ${
                    !userInfo.field.firstName ||
                    !userInfo.field.lastName ||
                    userInfo.field.phone.length < 11 ||
                    userInfo.field.phone.length < 8 ||
                    userInfo.field.password.length < 8 ||
                    userInfo.field.confirmPassword.length < 8 ||
                    userInfo.field.confirmPassword !== userInfo.field.password
                      ? "bg-gray-400"
                      : "bg-[#00735E]"
                  }`}
                  style={{ marginBottom: "9px" }}
                  disabled={
                    !userInfo.field.firstName ||
                    !userInfo.field.lastName ||
                    userInfo.field.phone.length < 11 ||
                    userInfo.field.phone.length < 8 ||
                    userInfo.field.password.length < 8 ||
                    userInfo.field.confirmPassword.length < 8 ||
                    userInfo.field.confirmPassword !== userInfo.field.password
                  }
                >
                  Salvar
                </Button>
              }
              link={`/`}
            />
          </div>
        </form>
      </div>
    </div>
  )
}