import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

interface PagingButtonProps {
  nextPage: () => void
  backPage: () => void
  value: any
}

export default function PagingButton({ nextPage, backPage, value }: PagingButtonProps){
  return (
    <div className="gap-5 flex text-slate-gray">
      <button onClick={backPage}>
        <IoIosArrowBack className="w-5 h-5" />
      </button>
      <span className="font-medium">{value}</span>
      <button onClick={nextPage}>
        <IoIosArrowForward className="w-5 h-5" />
      </button>
    </div>
  )
}