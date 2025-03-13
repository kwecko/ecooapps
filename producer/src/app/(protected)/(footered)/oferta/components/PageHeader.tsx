import AddProductButton from "./AddProductButton";

export default function PageHeader() {
  return (
    <div className="flex flex-col justify-start items-stretch h-[calc(13.3rem)] pb-0 pt-12 w-full">
      <div className="flex flex-col items-center justify-end h-[4.7rem] w-full">
        <span className="text-center text-3xl font-medium text-slate-gray">
          Sua oferta
        </span>
        <span className="mt-0.5 text-center text-sm font-medium text-slate-gray">
          Adicione produtos à sua oferta
        </span>
      </div>
      <AddProductButton disabled={false}/>
    </div>
  );
}
