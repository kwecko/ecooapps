export default function TableSkeleton() {
  return (
    <div className="bg-white rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="w-full flex gap-3">
          <div className="w-full flex flex-col gap-8 justify-center">
            <div className="w-32 h-[6px] bg-slate-200 rounded"></div>
            <div className="w-16 h-[6px] bg-slate-200 rounded"></div>
            <div className="w-28 h-[6px] bg-slate-200 rounded"></div>
            <div className="w-24 h-[6px] bg-slate-200 rounded"></div>
            <div className="w-16 h-[6px] bg-slate-200 rounded"></div>
            <div className="w-32 h-[6px] bg-slate-200 rounded"></div>
          </div>
          <div className="w-full flex flex-col gap-8 justify-center">
            <div className="w-20 h-[6px] bg-slate-200 rounded"></div>
            <div className="w-32 h-[6px] bg-slate-200 rounded"></div>
            <div className="w-16 h-[6px] bg-slate-200 rounded"></div>
            <div className="w-20 h-[6px] bg-slate-200 rounded"></div>
            <div className="w-24 h-[6px] bg-slate-200 rounded"></div>
            <div className="w-32 h-[6px] bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}