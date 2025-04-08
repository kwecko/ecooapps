"use client";

import Button from "@shared/components/Button";
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
    disabled?: boolean;
}

const ConfigItem = ({ icon: Icon, text, link, showBadge = false, disabled }: ConfigItemProps) => (
    <>
        {disabled && 
        <Button className="bg-white rounded-[8px] flex justify-between items-center p-4" disabled>
            <div className="flex items-center gap-6 text-[#545F71] relative">
                <Icon size={24} />
                <p>{text}</p>
                {showBadge && <span className="absolute top-0 left-4 w-2 h-2 bg-red-500 rounded-full"></span>}
            </div>
            <FiArrowRight className="text-[#9BA5B7]" />
        </Button>}
        {!disabled &&
            <Link href={link} className="bg-white rounded-[8px] flex justify-between items-center p-4">
                <div className="flex items-center gap-6 text-[#545F71] relative">
                    <Icon size={24} />
                    <p>{text}</p>
                    {showBadge && <span className="absolute top-0 left-4 w-2 h-2 bg-red-500 rounded-full"></span>}
                </div>
                <FiArrowRight className="text-[#9BA5B7]" />
            </Link>
        }
    </>

);

export default function Config() {
    return (
        <ModelPage title="Configurações">
            <div className="w-full flex flex-col gap-3 mt-5">
                <ConfigItem icon={FiBell} text="Notificações" link="/notificacoes" disabled />
                <ConfigItem icon={FiUser} text="Informações pessoais" link="/perfil/pessoal" />
                <ConfigItem icon={FiBriefcase} text="Informações do negócio" link="/perfil/comercial" />
                <ConfigItem icon={FiFileText} text="Termos de uso" link="/termos" />
                <ConfigItem icon={FiInfo} text="Sobre o e-COO" link="/sobre" />
                <ConfigItem icon={FiLogOut} text="Sair" link="/api/auth/logout" />
            </div>
        </ModelPage>
    );
}
