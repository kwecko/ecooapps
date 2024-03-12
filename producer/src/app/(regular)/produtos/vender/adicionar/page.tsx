"use client";
import { useEffect, useState } from "react";

import Step1Quantity from "./components/Step1-quantity";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step1Weight from "./components/Step1-weight";

interface product {
  id: string
  name: string
  preço: string
  pricing: string
  quantidade: string 
}

export default function Produtos() {
  const [currentStep, setCurrentStep] = useState(() => {
    const stepProductString = localStorage.getItem('offer-product-step')
    const stepProduct = stepProductString ? parseInt(stepProductString) : 0
    return stepProduct
  });
  
  const productDataString = localStorage.getItem('offer-products-data')
  const productData: product  = productDataString ? JSON.parse(productDataString) : null

  const { pricing } = productData

  useEffect(() => {
    localStorage.setItem('offer-product-step', JSON.stringify(currentStep))
  }, [currentStep])

  function nextStep() {
    setCurrentStep((prevStep) => prevStep + 1);
  }

  function backStep(){
    setCurrentStep((prevStep) => prevStep - 1);
  }

  const formComponentes = [
    {
      form: pricing === 'UNIT' ? <Step1Quantity goNextClick={nextStep} /> : <Step1Weight goNextClick={nextStep} />,
    },
    {
      form:  <Step2 goBackClick={backStep} goNextClick={nextStep} />,
    },
    {
      form: <Step3 goNextClick={nextStep} goBackClick={backStep} />,
    },
    {
      form: <Step4 />,
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col p-5 bg-background">
      {formComponentes[currentStep].form}
    </div>
  );
}
