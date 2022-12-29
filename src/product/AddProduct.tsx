import { useState } from "react";
import Radio from "../components/Radio";
import type { ItemMaster } from "../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { convertToBase64 } from "../helpers/";
import { useTranslation } from "react-i18next";

function AddProduct() {
  const [item, setItem] = useState<ItemMaster | {}>({});
  const { t } = useTranslation();
  const [isError, setIsError] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (
event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await axios("http://localhost:3001/items", {
        method: "POST",
        data: item,
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <>
      <div className="w-full bg-red-400">
        <p className="text-white text-center">{isError}</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="lg:w-2/5 w-full">
          <form
            className="bg-white shadow-md rounded p-8 pt-6 m-4"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("itemCode")}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="itemCode"
                type="text"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("description")}
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                value={(item as ItemMaster)?.description}
                rows={4}
                cols={50}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("active")}
              </label>
              <div className="my-5">
                <div className="flex items-center mb-4">
                  <Radio name="active" onChange={onChange} value="1" />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    True
                  </label>
                </div>

                <div className="flex items-center">
                  <Radio name="active" onChange={onChange} value="0" />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    False
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("customerDescription")}
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="customerDescription"
                rows={4}
                cols={50}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("salesItem")}
              </label>
              <div className="my-5">
                <div className="flex items-center mb-4">
                  <Radio name="salesItem" onChange={onChange} value="1" />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    True
                  </label>
                </div>

                <div className="flex items-center">
                  <Radio name="salesItem" onChange={onChange} value="0" />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    False
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("stockItem")}
              </label>
              <div className="my-5">
                <div className="flex items-center mb-4">
                  <Radio name="stockItem" onChange={onChange} value="1" />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    True
                  </label>
                </div>

                <div className="flex items-center">
                  <Radio name="stockItem" onChange={onChange} value="0" />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    False
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("purchasedItem")}
              </label>
              <div className="my-5">
                <div className="flex items-center mb-4">
                  <Radio name="purchasedItem" onChange={onChange} value="1" />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    True
                  </label>
                </div>
                <div className="flex items-center">
                  <Radio name="porchasedItem" onChange={onChange} value="0" />
                  <label className="text-sm font-medium text-gray-900 ml-2 block">
                    False
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("barcode")}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="barcode"
                type="text"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("manageItemBy")}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="manageItemBy"
                type="number"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("minimumInventory")}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="minimumInventory"
                type="number"
                step=".01"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("maximumInventory")}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="maximumInventory"
                type="number"
                step=".01"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("remarks")}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="remarks"
                type="text"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t("image")}
              </label>
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
                  setItem((prev) => ({ ...prev, imagePath: base64 }));
                }}
                accept="image/*"
              />
            </div>
            <div className="flex">
              <button className="bg-green-500 text-white p-1 w-full">
                {t("addItem")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
