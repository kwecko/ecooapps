import { twMerge } from "tailwind-merge";

interface OfferListHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  rest?: any;
}
export default function OfferListHeading({
  title,
  ...rest
}: OfferListHeadingProps) {
  return (
    <div
      className={twMerge(
        "flex flex-row items-center justify-center w-full gap-2 px-9 pt-1.5",
        rest.className
      )}
    >
      <hr className="w-full bg-french-gray h-px" />
      <small className="px-4 text-[10px] leading-4 text-[#8E8E93] whitespace-nowrap text-center ">
        {title}
      </small>
      <hr className="w-full bg-french-gray h-px" />
    </div>
  );
}
