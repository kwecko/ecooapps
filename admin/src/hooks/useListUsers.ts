import { listUsers } from "@admin/_actions/users/GET/list-users";
import { useHandleError } from "@shared/hooks/useHandleError";
import { UserDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";

interface UseListUsersProps {
  page: number;
  first_name?: string;
}

export default function useListUsers({ page, first_name }: UseListUsersProps) {
  const [data, setData] = useState<UserDTO[]>([] as UserDTO[]);

  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();
  useEffect(() => {
    (() => {
      setIsLoading(true);
      listUsers({
        page: page,
        first_name: first_name,
        roles: "USER",
      }).then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        setData(response.data);
        setIsLoading(false);
      });
    })();
  }, [page, first_name]);

  const updateData = (newData: UserDTO[]) => {
    setData(newData);
  };

  return { data, updateData, isLoading };
}