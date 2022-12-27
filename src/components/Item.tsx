type Props = {
  itemCode: string;
  description: string;
  active: boolean;
  onView: () => void;
};

const Item = ({ itemCode, description, active, onView }: Props) => (
  <div className="grid grid-cols-2 shadow-md">
      <img src="http://via.placeholder.com/240x160" />
      <div className="grid p-3">
        <p className="text-xl">{itemCode}</p>
        <p className="text-sm mt-3">{description}</p>
        <p className="text-sm">{active ? "Active" : "Desactive"}</p>
        <div className="mt-3">
          <button className="bg-blue-500 text-white p-1 w-full" onClick={onView}>View</button>
        </div>
      </div>
  </div>
);

export default Item;
