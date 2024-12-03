"use client";

import Button from "@shared/components/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import Loader from "../../components/Loader";

interface Button {
  router: string;
  name: string;
}

export interface DataSessionStorage {
  title: string;
  description: string;
  button: {
    primary?: Button;
    secondary?: Button;
  };
}

export default function Success() {
  const [data, setData] = useState<DataSessionStorage>(
    {} as DataSessionStorage
  );

  useEffect(() => {
    const storedData = sessionStorage.getItem("data-sucess");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (Object.keys(data).length === 0) {
    return <Loader loaderType="page" />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-5 bg-theme-background">
      <div className="w-full flex-grow flex justify-center flex-col">
        <div className="flex-grow flex items-center flex-col justify-center">
          <AiFillCheckCircle className="w-25 h-25 text-theme-highlight" />
          <span className="mt-6 text-center text-3xl text-theme-default font-medium">
            {data.title}
          </span>
          <span className="mt-4 text-center text-theme-default font-medium text-sm">
            {data.description}
          </span>
        </div>
        <div className="w-full pb-2 bg-red flex flex-col justify-end gap-4">
          {data.button.secondary && (
            <Link href={data?.button?.secondary.router}>
              <Button className="w-full rounded-lg font-semibold text-theme-default border-theme-default border-2 py-3">
                {data.button.secondary.name}
              </Button>
            </Link>
          )}
          {data.button.primary && (
            <Link href={data?.button?.primary.router}>
              <Button className="w-full px-2 py-3 font-semibold rounded-lg text-white border-0 p-3 bg-theme-default">
                {data.button.primary.name}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
