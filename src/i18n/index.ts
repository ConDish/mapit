import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLanguage } from "../helpers";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      search: "Search",
      notFound: "Not Found!",
      viewMore: "View more",
      itemCode: "Item Code",
      description: "Description",
      active: "Active",
      customerDescription: "Customer Description",
      salesItem: "Sales Item",
      stockItem: "Stock Item",
      purchasedItem: "Purchased Item",
      barcode: "Barcode",
      manageItemBy: "Manage Item By",
      minimumInventory: "Minimum Inventory",
      maximumInventory: "Maximum Inventory",
      remarks: "Remarks",
      image: "Image",
      createItem: 'Create Item',
      deleteItem: 'Delete',
      editItem: 'Edit',
      addItem: 'Add',
    },
  },
  ma: {
    translation: {
      search: "Tiftix",
      notFound: "Ma nstabx!",
      viewMore: "Aktar",
      itemCode: "Kodiċi tal-Oġġett",
      description: "Deskrizzjoni",
      active: "Attiva",
      customerDescription: "Deskrizzjoni tal-Klijent",
      salesItem: "Oġġett tal-Bejgħ",
      stockItem: "Oġġett tal-Istokk",
      purchasedItem: "Oġġett MixtriPurchased",
      barcode: "Barcode",
      manageItemBy: "Immaniġġja l-Item Minn",
      minimumInventory: "Inventarju Minimu",
      maximumInventory: "Inventarju Massimu",
      remarks: "Rimarki",
      image: "Immaġni",
      createItem: 'Oħloq item',
      deleteItem: 'Tħassar',
      editItem: 'Editja l-Item',
      addItem: 'Żid',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getLanguage(), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
