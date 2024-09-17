import Loader from "@shared/components/Loader";

export default function Loading(){
  return (
    <div className="w-full h-screen flex justify-center items-center bg-theme-background">
      <Loader 
        appId="CDD"
        loaderType="page"
      />
    </div>
  )
}