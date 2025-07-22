import {
  SendNotificationRequest,
  sendNotification as sendNotificationAction,
} from "@admin/_actions/notifications/POST/send-notification";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useState } from "react";
interface UseSendNotificationProps extends SendNotificationRequest {}

export default function useSendNotification() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  const sendNotification = async (
    data: UseSendNotificationProps
  ): Promise<boolean> => {
    setIsLoading(true);
    let success: boolean = false;
    await sendNotificationAction(data)
      .then(() => {
        success = true;
      })
      .catch(() => {
        handleError("Erro ao enviar a notificação.");
        success = false;
      })
      .finally(() => {
        setIsLoading(false);
      });
    return success;
  };

  return { sendNotification, isLoading };
}
