import Loader from "@shared/components/Loader";

export default function Loading(){
  return (
    <div className="w-full h-[90%] flex justify-center items-center bg-theme-background">
      <Loader
        className="mt-3" 
        appId="PRODUCER"
        loaderType="component"
      />
    </div>
  )
}