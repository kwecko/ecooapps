import { ModelPage } from "@shared/components/ModelPage";
import Link from "next/link";
import { 
    FiArrowRight, 
    FiBell, 
    FiUser, 
    FiBriefcase, 
    FiFileText, 
    FiInfo, 
    FiLogOut 
} from "react-icons/fi";

interface ConfigItemProps {
    icon: React.ElementType;
    text: string;
    link: string;
    showBadge?: boolean;
}

const ConfigItem = ({ icon: Icon, text, link, showBadge = false }: ConfigItemProps) => (
    <Link href={link} className="bg-white rounded-[8px] flex justify-between items-center p-4">
        <div className="flex items-center gap-6 text-[#545F71] relative">
            <Icon size={24} />
            <p>{text}</p>
            {showBadge && <span className="absolute top-0 left-4 w-2 h-2 bg-red-500 rounded-full"></span>}
        </div>
        <FiArrowRight className="text-[#9BA5B7]" />
    </Link>
);

export default function Config() {
    return (
        <ModelPage title="Configurações">
            <div className="w-full flex flex-col gap-3 mt-5">
                <ConfigItem icon={FiBell} text="Notificações" link="/notificacoes" showBadge />
                <ConfigItem icon={FiUser} text="Informações pessoais" link="/perfil/pessoal" />
                <ConfigItem icon={FiBriefcase} text="Informações do negócio" link="/perfil/comercial" />
                <ConfigItem icon={FiFileText} text="Termos de uso" link="/" />
                <ConfigItem icon={FiInfo} text="Sobre o e-COO" link="/" />
                <ConfigItem icon={FiLogOut} text="Sair" link="/" />
            </div>
        </ModelPage>
    );
}
