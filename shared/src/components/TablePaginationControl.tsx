import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function TablePaginationControl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const p = searchParams.get("p");
  const pageNumber = (p && parseInt(p)) || 1;
  const prev = pageNumber > 1 ? pageNumber - 1 : null;
  const next = pageNumber + 1;
  const getUpdatedSearchParams = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("p", newPage.toString());
    return params.toString();
  };
  return (
    <div className="gap-5 flex items-center text-theme-primary font-semibold font-inter font-base leading-5.5 tracking-tight-2">
      {prev && (
        <Link
          href={{
            pathname: pathname,
            search: getUpdatedSearchParams(prev),
          }}
        >
          <IoIosArrowBack className="w-5 h-5" />
        </Link>
      )}
      <span className="">{pageNumber}</span>
      {next && (
        <Link
          href={{
            pathname: pathname,
            search: getUpdatedSearchParams(next),
          }}
        >
          <IoIosArrowForward className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
}
