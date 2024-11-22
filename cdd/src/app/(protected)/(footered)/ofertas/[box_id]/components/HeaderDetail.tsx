interface HeaderDetailProps {
  id: string | undefined;
  name: string | undefined;
  status: string;
  time: string;
}

const styles = {
  containerDetail:
    "flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3",
};

function HeaderDetail({ id, name, time, status }: HeaderDetailProps) {
  return (
    <div className="w-full mx-auto bg-white rounded-lg">
      <div className={styles.containerDetail}>
        <span className="w-1/5">Pedido:</span>
        <span className="w-4/5">{id}</span>
      </div>
      <div className={styles.containerDetail}>
        <span className="w-1/5">Status:</span>
        <span className="w-4/5">{status}</span>
      </div>
      <div className={styles.containerDetail}>
        <span className="w-1/5">Produtor:</span>
        <span className="w-4/5">{name}</span>
      </div>
      <div className={styles.containerDetail}>
        <span className="w-1/5">Prazo:</span>
        <span className="w-4/5">{time}</span>
      </div>
    </div>
  );
}

export default HeaderDetail;
