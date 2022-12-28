import { Link } from "react-router-dom";
import i18next from "../i18n";

type Props = {
  itemCode: string;
  description: string;
  active: boolean;
  image: string;
};

const Item = ({ itemCode, description, active, image }: Props) => (
  <div className="grid grid-cols-2 shadow-md">
    <img src={image} alt="ItemImage" className="w-full" />
    <div className="grid p-3">
      <p className="text-xl">{itemCode}</p>
      <p className="text-sm mt-3">{description}</p>
      <p className="text-sm">{active ? "Active" : "Desactive"}</p>
      <div className="mt-3">
        <Link to={`/${itemCode}`}>
          <button className="bg-blue-500 text-white p-1 w-full">
            {i18next.t("viewMore")}
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default Item;
