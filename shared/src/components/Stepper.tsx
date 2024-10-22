import React from "react";
import { motion } from "framer-motion";

interface StepperProps {
  size: number;
  currentStep: number;
}

export default function Stepper({ size, currentStep }: StepperProps) {
  return (
    <div className="w-full flex mx-auto items-center justify-center pt-5">
      <div className="flex justify-between items-center w-11/12">
        {Array.from({ length: size }, (_, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= index + 1
                    ? "bg-slate-gray text-white"
                    : "border-2 border-french-gray text-french-gray"
                }`}
                animate={
                  currentStep === index + 1
                    ? { scale: [1, 1.3, 1] }
                    : { scale: 1 }
                }
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <span className="text-2xl font-bold">{index + 1}</span>
              </motion.div>
            </div>
            {index < size - 1 && (
              <motion.div
                className="flex-1 h-1 bg-gray-300"
                initial={{ width: "0%" }}
                animate={{
                  width: currentStep > index + 1 ? "100%" : "0%",
                  backgroundColor: currentStep > index + 1 ? "#6B7280" : "#D1D5DB",
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
