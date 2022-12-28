import useGetItemByCode from "../hooks/useGetItemByCode";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ItemMaster } from "../types";
import { useNavigate } from "react-router-dom";
import Radio from "../components/Radio";
import { convertToBase64 } from "../helpers";
import axios from "axios";
import { useTranslation } from 'react-i18next'

function EditProduct() {
  const { itemCode } = useParams();
  const {t} = useTranslation();
  const { itemMaster, isLoading } = useGetItemByCode(itemCode ?? "");
  const [item, setItem] = useState<ItemMaster | {}>();
  const [isError, setIsError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemMaster) {
      return;
    }
    setItem(itemMaster);
  }, [itemMaster]);

  const onSubmit = async () => {
    try {
      const response = await axios(`http://localhost:3001/items/${itemCode}`, {
        method: "POST",
        data: item,
      });
      console.log(response);
      if (response.data.status === 0) {
        setIsError("Something bad happened! :(");
        return;
      }
      navigate("/");
    } catch (error) {
      setIsError("Something bad happened! :(");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "active" ||
        e.target.name === "salesItem" ||
        e.target.name === "stockItem" ||
        e.target.name === "purchasedItem"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };
  const onDelete = async (itemCode: string) => {
    try {
      const response = await axios(`http://localhost:3001/items/${itemCode}`, {
        method: "DELETE",
      });
      if (response.data.status === 0) {
        setIsError("Something bad happened! :(");
        return;
      }
      navigate("/");
    } catch (error) {
      setIsError("Something bad happened! :(");
    }
  };

  if (isLoading || !itemMaster) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div className="flex w-full p-4 align-end justify-end">
        <Link
          to="/create"
          className="bg-green-500 text-white p-1 w-1/4 text-center"
        >
          {t('createItem')}
        </Link>
      </div>
      <div className="w-full bg-red-400">
        <p className="text-white text-center">{isError}</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="lg:w-2/5 w-full">
          <div className="bg-white shadow-md rounded p-8 pt-6 m-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('itemCode')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="itemCode"
                type="text"
                value={(item as ItemMaster)?.itemCode}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('description')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                value={(item as ItemMaster)?.description}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('active')}
              </label>
              <div className="my-5">
                <div className="flex items-center mb-4">
                  <Radio
                    name="active"
                    onChange={() => console.log("Changed!")}
                    value="1"
                    checked={(item as ItemMaster)?.active}
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    True
                  </label>
                </div>

                <div className="flex items-center">
                  <Radio
                    name="active"
                    onChange={() => console.log("Changed!")}
                    value="0"
                    checked={!(item as ItemMaster)?.active}
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    False
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('customerDescription')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="customerDescription"
                type="text"
                value={(item as ItemMaster)?.customerDescription}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('salesItem')}
              </label>
              <div className="my-5">
                <div className="flex items-center mb-4">
                  <Radio
                    name="salesItem"
                    onChange={() => console.log("Changed!")}
                    value="1"
                    checked={(item as ItemMaster)?.salesItem}
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    True
                  </label>
                </div>

                <div className="flex items-center">
                  <Radio
                    name="salesItem"
                    onChange={() => console.log("Changed!")}
                    value="0"
                    checked={!(item as ItemMaster)?.salesItem}
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    False
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('stockItem')}
              </label>
              <div className="my-5">
                <div className="flex items-center mb-4">
                  <Radio
                    name="stockItem"
                    onChange={() => console.log("Changed!")}
                    value="1"
                    checked={(item as ItemMaster)?.stockItem}
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    True
                  </label>
                </div>

                <div className="flex items-center">
                  <Radio
                    name="stockItem"
                    onChange={() => console.log("Changed!")}
                    value="0"
                    checked={!(item as ItemMaster)?.stockItem}
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    False
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('purchasedItem')}
              </label>
              <div className="my-5">
                <div className="flex items-center mb-4">
                  <Radio
                    name="purchasedItem"
                    onChange={() => console.log("Changed!")}
                    value="1"
                    checked={(item as ItemMaster)?.purchasedItem}
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    True
                  </label>
                </div>
                <div className="flex items-center">
                  <Radio
                    name="purchasedItem"
                    onChange={() => console.log("Changed!")}
                    value="0"
                    checked={(item as ItemMaster)?.purchasedItem}
                  />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    False
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('barcode')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="barcode"
                type="text"
                value={(item as ItemMaster)?.barcode}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('manageItemBy')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="manageItemBy"
                type="number"
                value={(item as ItemMaster)?.manageItemBy}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('minimumInventory')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="minimumInventory"
                type="number"
                step=".01"
                value={(item as ItemMaster)?.minimumInventory}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('maximumInventory')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="maximumInventory"
                type="number"
                step=".01"
                value={(item as ItemMaster)?.maximumInventory}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('remarks')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="remarks"
                type="text"
                value={(item as ItemMaster)?.remarks}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('image')}
              </label>
              <img
                src={(item as ItemMaster)?.imagePath}
                alt="ImageItem"
                className="mb-3"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="image"
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    return;
                  }
                  const base64 = await convertToBase64(file);
                  setItem((prev) => ({ ...(prev as any), imagePath: base64 }));
                }}
                accept="image/*"
              />
            </div>
            <div className="flex gap-4">
              <button
                className="bg-red-500 text-white p-1 w-full"
                onClick={() => onDelete((item as ItemMaster)?.itemCode)}
              >
                {t('deleteItem')}
              </button>
              <button className="bg-blue-500 text-white p-1 w-full" onClick={onSubmit}>
                {t('editItem')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
