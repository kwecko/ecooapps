import React, { ReactNode, useState } from "react";

interface ProductCardDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  description?: string;
}

export default function ProductCardDescription({
  className,
  description,
  ...rest
}: ProductCardDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-[calc(100%-2.5rem)] h-full">
      {description && description.length <= 70 && (
        <p className="w-full text-left text-xs text-theme-home-bg">{description}</p>
      )}
      {description && description.length > 70 && (
        <p>
          <p className="w-full text-left text-xs text-theme-home-bg">
            {isExpanded
              ? description
              : `${description?.slice(0, 70).trimEnd()}...`}
          </p>
          <button
            onClick={toggleDescription}
            className="text-theme-home-bg text-xs font-semibold underline"
          >
            {isExpanded ? "Fechar" : "Leia mais"}
          </button>
        </p>
      )}
    </div>
  );
}
