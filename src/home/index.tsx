import { useState, useEffect } from "react";
import { useGetItems } from "../hooks/useGetItems";
import Item from "../components/Item";

const Home = () =>  {
  const [count, setCount] = useState(0);
  const { itemMaster, isError, isLoading } = useGetItems();

  if (isError || !itemMaster) {
    return <h1>Error!</h1>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 p-10">
        <div className="flex flex-row gap-3 items-center justify-center">
          <input className="w-1/4 border p-1" />
          <button className="p-1 w-20 bg-blue-500 rounded-lg text-white">
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {itemMaster.map((item) => (
          <Item
            key={item.itemCode}
            itemCode={item.itemCode}
            description={item.description}
            active={item.active === 1}
          />
        ))}
      </div>
    </div>
  );
}

export default Home 