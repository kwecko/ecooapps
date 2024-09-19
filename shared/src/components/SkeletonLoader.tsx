export default function SkeletonLoader(){
  return (
    <div className="flex justify-center items-center max-w-sm w-full mx-auto">
      <div className="animate-pulse flex">
        <div className="flex items-center gap-2">
          <div className="h-[6px] bg-theme-primary rounded w-24 bg-slate-200"></div>
          <div className="h-[6px] bg-theme-primary rounded w-20 bg-slate-200"></div>
        </div>
      </div>
    </div>
  )
}