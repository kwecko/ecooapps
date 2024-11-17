import {
  HiOutlineChartPie,
  HiOutlineChartSquareBar,
  HiOutlineChatAlt2,
  HiOutlineCog,
  HiOutlineCube,
  HiOutlineLogin,
  HiOutlineShoppingBag,
  HiOutlineUserCircle,
} from "react-icons/hi";

import Navlink from "./Navlink";

export default function Sidebar() {
  return (
    <nav className="bg-theme-home-bg min-w-sidebar box-border p-4 h-full flex flex-col justify-between">
      <section className="flex flex-col items-center">
        <Navlink href="/" icon={<HiOutlineChartPie />}>
          Painel de controle
        </Navlink>
        <Navlink href="/produtos" icon={<HiOutlineShoppingBag />}>
          Meus produtos
        </Navlink>
        <Navlink href="/estoque" icon={<HiOutlineCube />}>
          Estoque
        </Navlink>
        <Navlink href="/vendas" icon={<HiOutlineChartSquareBar />}>
          Minhas vendas
        </Navlink>
        <Navlink href="/perfil" icon={<HiOutlineUserCircle />}>
          Meus dados
        </Navlink>
        <Navlink href="/ajuda" icon={<HiOutlineChatAlt2 />}>
          Obter ajuda
        </Navlink>
      </section>
      <section className="flex flex-col items-center border-t border-theme-highlight pt-4">
        <Navlink href="/configuracoes" icon={<HiOutlineCog />}>
          Configurações
        </Navlink>
        <Navlink href="/api/auth/logout" icon={<HiOutlineLogin />}>
          Sair
        </Navlink>
      </section>
    </nav>
  );
}
