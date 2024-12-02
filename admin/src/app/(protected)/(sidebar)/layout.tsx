import Sidebar from "@admin/app/components/Sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <Sidebar />
     <main className="w-full h-full p-15 pt-24">
      {children}
     </main>
    </>
  );
}
