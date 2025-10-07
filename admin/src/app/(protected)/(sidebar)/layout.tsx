import Sidebar from "@admin/app/components/Sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      <main className="w-full ml-[300px] h-full p-15">
        {children}
      </main>
    </>
  );
}
