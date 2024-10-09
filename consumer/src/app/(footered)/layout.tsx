import Footer from "@shared/components/Footer";

export default function LayoutWithFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between w-full h-full min-h-screen bg-theme-background">
      {children}
      <Footer
        appID={"CONSUMER"}
        bgColor={"#3E5155"}
      />
    </div>
  );
}
