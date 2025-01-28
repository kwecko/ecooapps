export const convertPaymentStatus = (status: string) => {
  const statuses: Record<string, string> = {
    PENDING: "Pendente",
    DONE: "Concluído",
    FAILED: "Falhou",
  };

  const textColorStatus: Record<string, string> = {
    PENDING: "text-yellow-500",
    DONE: "text-green-500",
    FAILED: "text-red-500",
  };

  return {
    name: statuses[status],
    nameColor: textColorStatus[status],
  };
};

export const convertPaymentType = (type: string) => {
  const types: Record<string, string> = {
    CREDIT: "Crédito",
    DEBIT: "Débito",
    CASH: "Dinheiro",
    PIX: "PIX",
  };

  return { name: types[type] };
};

export const convertPaymentFlag = (flag: string) => {
  const flags: Record<string, string> = {
    VISA: "Visa",
    MASTERCARD: "Mastercard",
    OTHER: "Outros",
  };

  return { name: flags[flag] };
};

export default { convertPaymentStatus, convertPaymentType, convertPaymentFlag };
