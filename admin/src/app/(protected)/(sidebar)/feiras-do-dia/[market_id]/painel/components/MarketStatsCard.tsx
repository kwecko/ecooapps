"use client";

import ButtonV2 from "@shared/components/ButtonV2";
import { formatPrice } from "@shared/utils/format-price";

interface MarketStatsCardProps {
  title: string;
  value: string | number;
  formatAsPrice?: boolean;
  buttons?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "light" | "transparent";
    className?: string;
    disabled?: boolean;
  }[];
  infoIcon?: boolean;
}

export default function MarketStatsCard({
  title,
  value,
  formatAsPrice = false,
  buttons = [],
  infoIcon = false,
}: MarketStatsCardProps) {
  const displayValue =
    typeof value === "number"
      ? formatAsPrice
        ? formatPrice(value)
        : value.toLocaleString("pt-BR")
      : value;

  return (
    <div className="flex flex-col bg-white rounded-2xl p-6 gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>
      <div className="text-4xl font-semibold text-rain-forest">
        {displayValue}
      </div>
      {buttons.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          {buttons.map((button, index) => (
            <ButtonV2
              key={index}
              type="button"
              variant={button.variant || "default"}
              onClick={button.onClick}
              disabled={button.disabled}
              className={`w-full h-12 bg-theme-highlight text-white font-semibold rounded-md ${
                button.className || ""
              }`}
            >
              {button.label}
            </ButtonV2>
          ))}
        </div>
      )}
    </div>
  );
}

