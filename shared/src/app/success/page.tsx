"use client";

import Button from "@shared/components/Button";
import { SuccessPageModel } from "@shared/components/SuccessPageModel";
import React, { useEffect, useState } from "react";
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
    const storedData = sessionStorage.getItem("data-success");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (Object.keys(data).length === 0) {
    return <Loader loaderType="page" />;
  }

  return (
    <SuccessPageModel
      title={data.title}
      description={data.description}
      primaryButtonText={data.button.primary?.name}
      primaryButtonHref={data.button.primary?.router}
      secondaryButtonHref={data.button.secondary?.router}
      secondaryButtonText={data.button.secondary?.name}
    />
  );
}
