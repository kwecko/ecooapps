import CustomModal from "@shared/components/CustomModal";
import { HiOutlineInformationCircle } from "react-icons/hi";

export interface InfoIconModalProps {
  title: string;
  content: string;
}

export default function InfoIconModal({ title, content }: InfoIconModalProps) {
  return (
    <CustomModal
      titleContentModal={title}
      contentModal={content}
      bgConfirmModal="#2F4A4D"
      titleConfirmModal="Ok"
      buttonOpenModal={
        <HiOutlineInformationCircle className="text-2xl text-theme-primary" />
      }
    />
  );
}
