import React, { ReactNode } from "react";

interface HeaderDetailProps {
  id: string | undefined;
  name: string | undefined;
  status?: string;
  selectStatus?: ReactNode;
  time: string;
  content?: ReactNode;
}

const styles = {
  containerDetail: "flex gap-10 items-start text-theme-primary border-b p-3",
};

function HeaderDetail({
  id,
  name,
  time,
  status,
  selectStatus,
  content,
}: HeaderDetailProps) {
  return (
    <div className="w-full mx-auto bg-white rounded-lg">
      <div className={styles.containerDetail}>
        <span className="w-1/5">Pedido:</span>
        <span className="w-4/5">{id}</span>
      </div>
      <div className={styles.containerDetail}>
        {selectStatus ? (
          <>
            <span className="w-1/5 mt-1">Status:</span>
            <span className="w-4/5 mr-3 ml-1 mb-2">{selectStatus}</span>
          </>
        ) : (
          <>
            <span className="w-1/5">Status:</span>
            <span className="w-4/5">{status}</span>
          </>
        )}
      </div>
      <div className={styles.containerDetail}>
        <span className="w-1/5">Produtor:</span>
        <span className="w-4/5">{name}</span>
      </div>
      <div className={styles.containerDetail}>
        <span className="w-1/5">Prazo:</span>
        <span className="w-4/5">{time}</span>
      </div>
      <div className={styles.containerDetail}>
        <span className="w-1/5">Conteúdo:</span>
        <span className="w-4/5">{content && JSON.stringify(content)}</span>
      </div>
    </div>
  );
}

export default HeaderDetail;
