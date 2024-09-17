export const convertStatus = (status: string) => {
  const statuses: Record<string, string> = {
    PENDING: "Pendente",
    VERIFIED: "Aprovado",
    CANCELLED: "Cancelado",
  };

  return statuses[status];
};
