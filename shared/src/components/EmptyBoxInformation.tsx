import React from "react";

import { FaBoxOpen } from "react-icons/fa6";

import { twMerge } from "tailwind-merge";

interface EmptyBoxInformationProps {
  children: React.ReactNode;
  style?: string;
}

const EmptyBoxInformation = ({
  children,
  style = "",
  ...rest
}: EmptyBoxInformationProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col justify-center gap-1 items-center mt-3 text-theme-default",
        style
      )}
      {...rest}
    >
      <FaBoxOpen className="walnut-brown" size={64} />
      <span className="text-center w-52">{children}</span>
    </div>
  );
};

export default EmptyBoxInformation;
