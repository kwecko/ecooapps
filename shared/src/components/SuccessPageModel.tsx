import { ModelPage } from "@shared/components/ModelPage";
import { IoCheckmarkCircle } from "react-icons/io5";
import Link from "next/link";
import Button from "@shared/components/Button";

interface SuccessPageModelProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export function SuccessPageModel({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: SuccessPageModelProps) {
  return (
    <ModelPage
      buttonArea={
        <div className="w-full flex flex-col gap-3">
          {secondaryButtonText && secondaryButtonHref && (
            <Link href={secondaryButtonHref}>
              <Button className="w-full bg-transparent rounded-md h-12 text-theme-default border-2 border-theme-default font-semibold">
                {secondaryButtonText}
              </Button>
            </Link>
          )}
          {primaryButtonText && primaryButtonHref && (
            <Link href={primaryButtonHref}>
              <Button className="w-full bg-theme-default rounded-md h-12 text-white font-semibold">
                {primaryButtonText}
              </Button>
            </Link>
          )}
        </div>
      }
    >
      <div className="w-full h-full flex flex-col items-center justify-start gap-4 pt-38">
        <IoCheckmarkCircle size={125} className="text-rain-forest" />
        <h1 className="px-12 text-3xl leading-8.5 text-center font-medium">{title}</h1>
        <p className="pt-1 px-10 text-sm font-medium text-center">{description}</p>
      </div>
    </ModelPage>
  );
}
