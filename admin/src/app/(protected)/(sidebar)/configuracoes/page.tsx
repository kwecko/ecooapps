import Title from "@admin/app/components/Title";
import ListWarehouseInfo from "./components/ListWarehouseInfo";


export default function page() {
  return (
    <div>
      <Title className="flex">Configurações</Title>
      <ListWarehouseInfo />
    </div>
  );
}
