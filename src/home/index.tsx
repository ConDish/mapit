import { useGetItems } from "../hooks/useGetItems";
import Item from "../components/Item";
import { ItemMaster } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next'
import { getLanguage } from "../helpers";

const Home = () => {
  const { itemMaster, isError, isLoading } = useGetItems();
  const [items, setItems] = useState<ItemMaster[]>();
  const [search, setSearch] = useState<string>();
  const {t, i18n} = useTranslation();

  useEffect(() => {
    if (!itemMaster) {
      return;
    }
    setItems(itemMaster);
  }, [itemMaster]);

  const onSearch = async () => {
    try {
      const {
        data: { data: itemResponse },
      } = await axios(`http://localhost:3001/items/search/${search}`);
      if (!itemResponse) {
        return;
      }
      setItems(itemResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSelect = (value: string) => {
    console.log(value);
    i18n.changeLanguage(value);
  };

  if (isLoading || isError) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <select onChange={(e) => onChangeSelect(e.target.value)} defaultValue={getLanguage()}>
        <option value="en">English</option>
        <option value="ma">Maltese</option>
      </select>
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 p-10">
          <div className="flex flex-row gap-3 items-center justify-center">
            <input
              className="w-1/4 border p-1"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="p-1 w-20 bg-blue-500 rounded-lg text-white"
              onClick={onSearch}
            >
              {t("search")}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {items?.map((item) => (
            <Item
              key={item.itemCode}
              itemCode={item.itemCode}
              image={item.imagePath}
              description={item.description}
              active={item.active}
            />
          ))}
        </div>
        {!items?.length ? (
          <h1 className="text-center">{t("notFound")}</h1>
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default Home;
