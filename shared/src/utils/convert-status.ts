export const convertStatus = (status: string) => {
  const statuses: Record<string, string> = {
    PENDING: "Pendente",
    VERIFIED: "Aprovados",
  };

  return statuses[status];
};
