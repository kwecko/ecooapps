'use client'

import { IoIosAlert } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CustomToastErrorProps {
  error: string;
  labelButton: string;
  redirectTo: string;
}

export default function CustomToastError({ error, labelButton, redirectTo }: CustomToastErrorProps) {
  const router = useRouter();

  const handleRedirectClick = () => {
    router.push(redirectTo);
    toast.dismiss();
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-2">
        <IoIosAlert className="text-red-500 w-7 h-7" />
        <span>{error}</span>
      </div>
      <button
        onClick={handleRedirectClick}
        style={{
          width: '100%',
          fontSize: '14px',
          background: '#FF7070',
          padding: '8px 16px',
          color: '#fff',
          marginTop: '10px',
          textAlign: 'center',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {labelButton}
      </button>
    </div>
  );
}
