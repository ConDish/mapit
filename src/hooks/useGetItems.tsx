import { useState, useEffect } from "react";
import type { ItemMaster } from "../types";
import axios from "axios";
export function useGetItems() {
  const [itemMaster, setItemMaster] = useState<ItemMaster[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: items },
        } = await axios("http://localhost:3001/items");
        if (!items) {
          setIsError(true);
          return;
        }
        setItemMaster(items);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { itemMaster, isLoading, isError };
}
