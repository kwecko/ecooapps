import Copyright from "@admin/app/components/Copyright";
import Title from "@admin/app/components/Title";
import SendNotificationForm from "./components/SendNotificationForm";

export default function page() {
  return (
    <div className="lg:grid lg:grid-cols-11 h-full gap-14 overflow-hidden pt-7.5">
      <div className="flex flex-col h-full col-span-5 pt-18 overflow-hidden">
        <Title className="absolute top-0 pt-22.5">Enviar notificações</Title>
        <SendNotificationForm />
        <Copyright type="primary" className="pl-8.5" />
      </div>
    </div>
  );
}
