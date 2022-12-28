export type ItemMaster = {
  itemCode: string;
  description: string;
  active: boolean;
  customerDescription: string;
  salesItem: boolean;
  stockItem: boolean;
  purchasedItem: boolean;
  barcode: string;
  manageItemBy: number;
  minimumInventory: number;
  maximumInventory: number;
  remarks: string;
  imagePath: string;
};

export type ItemMasterResponse = {
  itemCode: string;
  description: string;
  active: boolean;
  customerDescription: string;
  salesItem: boolean;
  stockItem: boolean;
  purchasedItem: boolean;
  barcode: string;
  manageItemBy: number;
  minimumInventory: number;
  maximumInventory: number;
  remarks: string;
  imagePath: string;
};
