import { twMerge } from "tailwind-merge";

interface OfferListHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  rest?: any;
}
export default function OfferListHeading({ title, ...rest }: OfferListHeadingProps) {
  return (
    <div className={twMerge("flex flex-row items-center pb-2 justify-center w-full gap-2", rest.className)}>
      <hr
        className="w-16 text-[#D1D1D6] bg-[#D1D1D6] h-0.5"
      />
      <div className="flex flex-col items-center justify-center w-28">
        <small
          className="text-xs text-[#8E8E93] w-28 text-center"
        >
          {title}
        </small>
      </div>
      <hr
        className="w-16 text-[#D1D1D6] bg-[#D1D1D6] h-0.5"
      />
    </div>
  );
}   
