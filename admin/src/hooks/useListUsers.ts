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
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
      const response = await listUsers({
        page: page,
        first_name: first_name,
        roles: "USER",
      });
      if (response.message) {
        handleError(response.message);
      }
      setData(response.data);
      } catch (error) {
      handleError(error instanceof Error ? error.message : String(error));
      } finally {
      setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page, first_name]);

  const updateData = (newData: UserDTO[]) => {
    setData(newData);
  };

  const reloadData = async () => {
    const response = await listUsers({
      page: page,
      first_name: first_name,
      roles: "USER",
    });
    if (response.message) {
      handleError(response.message);
    }
    setData(response.data);
  };

  return { data, updateData, isLoading, reloadData };
}