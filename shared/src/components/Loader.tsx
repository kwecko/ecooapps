interface LoaderProps {
  className?: string
}

export default function Loader({ className }: LoaderProps){
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={`border-2 border-t-2 border-t-transparent rounded-full animate-spin ${className}`}></div>
    </div>
  )
}