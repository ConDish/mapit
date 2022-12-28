import { useEffect, useState } from "react";
import type { ItemMaster } from "../types";
import axios from "axios";

function useGetItemByCode(id: string) {
  const [itemMaster, setItemMaster] = useState<ItemMaster>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const {
          data: { data: itemMaster },
        } = await axios(`http://localhost:3001/items/${id}`);
        if (!itemMaster) {
          setIsLoading(true);
          return;
        }
        setItemMaster(itemMaster[0]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);
  return { itemMaster, isLoading, isError };
}

export default useGetItemByCode;
