"use client";

import {
  HiOutlineAnnotation,
  HiOutlineCalculator,
  HiOutlineChartPie,
  HiOutlineCog,
  HiOutlineCollection,
  HiOutlineDocumentReport,
  HiOutlineLogin,
  HiOutlineUserAdd,
} from "react-icons/hi";

import { useRouter } from "next/navigation";
import Navlink from "./Navlink";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    router.push("/api/auth/logout");
  };

  return (
    <nav className="bg-theme-home-bg min-w-sidebar box-border p-4 h-full flex flex-col justify-between">
      <section className="flex flex-col items-center">
        <Navlink href="/" icon={<HiOutlineChartPie />}>
          Painel de controle
        </Navlink>
        <Navlink href="/pedidos" icon={<HiOutlineCalculator />}>
          Pedidos
        </Navlink>
        <Navlink href="/produtores" icon={<HiOutlineUserAdd />}>
          Produtores
        </Navlink>
        <Navlink href="/produtos" icon={<HiOutlineCollection />}>
          Produtos
        </Navlink>
        <Navlink href="/notificar" icon={<HiOutlineAnnotation />}>
          Enviar notificações
        </Navlink>
        <Navlink href="/relatorios" icon={<HiOutlineDocumentReport />}>
          Emitir relatórios
        </Navlink>
      </section>
      <section className="flex flex-col items-center border-t border-theme-highlight pt-4">
        <Navlink href="/configuracoes" icon={<HiOutlineCog />}>
          Configurações
        </Navlink>
        <Navlink onClick={logout} icon={<HiOutlineLogin />}>
          Sair
        </Navlink>
      </section>
    </nav>
  );
}
