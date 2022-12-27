export type ItemMaster = {
  itemCode: string;
  description: string;
  active: number;
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
