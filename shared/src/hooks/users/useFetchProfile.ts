import { fetchProfile as fetchProfileAction } from "@shared/_actions/users/GET/fetch-profile";
import { UserDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useHandleError } from "../useHandleError";

export default function useFetchProfile() {
  const [data, setData] = useState<UserDTO>({} as UserDTO);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();

  const fetchProfile = async () => {
    setIsLoading(true);
    await fetchProfileAction()
      .then((response: any) => {
        if (response.message) {
          const messageError = response.message as string;
          handleError(messageError);
        } else if (response.data) {
          setData(response.data);
          return;
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    fetchProfile().finally(() => {
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading, fetchProfile };
}
