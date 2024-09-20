"use client";
import { LuEye } from "react-icons/lu";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";

import { maskCellphone } from "@shared/utils/index"

import Input from "../components/Input";
import { registerStep1FieldsSchema } from "../schemas";

export default function RegisterStep1() {
  const unparsedFormData =
    typeof window !== "undefined"
      ? localStorage.getItem("register-form-data")
      : undefined;
  const formData = unparsedFormData ? JSON.parse(unparsedFormData) : null;

  const passwordRequirements = "Sua senha deve ter pelo menos 8 caracteres.";

  const userTypeOptions = ["Consumidor", "Produtor"];
  
  const [userType, setUserType] = useState("Consumidor");

  const handleUserTypeChange = (newUserType: string) => {
    setUserType(newUserType);

    const formStorageContent = JSON.parse(
      localStorage.getItem("reg") as string
    );

    if (newUserType === "Consumidor") {
      localStorage.setItem(
        "register-form-data",
        JSON.stringify({
          ...formStorageContent,
          roles: ["USER"],
        })
      );
    } else {
        localStorage.setItem(
          "register-form-data",
          JSON.stringify({
            ...formStorageContent,
            roles: ["USER", "ADMIN", "PRODUCER"],
          })
        );
      }
  }

  return (
    <>
      <div>
      <span className="text-sm font-inter text-slate-gray">
        Selecione o tipo de usuário
      </span>
      <Listbox value={userType} onChange={handleUserTypeChange}>
          {({ open }) => (
            <>
              <div className="relative mt-1">
                <Listbox.Button
                  className={`relative w-full py-3 cursor-default rounded-[6px] bg-white pl-3 pr-10 text-left ring-1 ring-slate-gray ${
                    open ? "ring-2 ring-slate-gray" : ""
                  }`}
                >
                  <span className="block truncate text-slate-gray">
                    {userType}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <LuChevronsUpDown
                      className="h-5 w-5 text-slate-gray"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {userTypeOptions?.map((option) => (
                      <Listbox.Option
                        key={option}
                        className={({ selected }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            selected
                              ? "text-slate-gray bg-theme-background"
                              : "bg-white"
                          }`
                        }
                        value={option}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate text-slate-gray}`}>
                              {option}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-theme-background">
                                <FaCheck
                                  className="h-4 w-4 text-slate-gray"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div className="mt-6">
        <Input
          name="email"
          placeholder="suporte@ecoo.org.br"
          label="Email"
          type="email"
          initialValue={formData?.email || null}
          validationSchema={registerStep1FieldsSchema.email}
          localStorageFormKey="register-form-data"
        />
        <Input
          name="phone"
          placeholder="(xx) xxxxx-xxxx"
          label="Celular"
          type="text"
          mask={maskCellphone}
          initialValue={formData?.phone || null}
          validationSchema={registerStep1FieldsSchema.phone}
          localStorageFormKey="register-form-data"
        />
        <Input
          name="password"
          placeholder="******"
          label={
            (
              <>
                Senha
                <Tooltip title={passwordRequirements}>
                  <InfoCircleOutlined
                    style={{ color: "rgba(0,0,0,.45)", marginLeft: 10 }}
                  />
                </Tooltip>
              </>
            ) as unknown as Element
          }
          type="password"
          initialValue={formData?.password || null}
          validationSchema={registerStep1FieldsSchema.password}
          icon={<LuEye size={24} />}
          localStorageFormKey="register-form-data"
        />
      </div>
      
    </>
  );
}
