import { Link } from "react-router-dom";
import i18next from "../i18n";

type Props = {
  itemCode: string;
  description: string;
  active: boolean;
  image: string;
};

const Item = ({ itemCode, description, active, image }: Props) => (
  <div className="flex justify-center">
    <div className="rounded-lg shadow-lg bg-white max-w-sm">
      <img className="rounded-t-lg w-full" src={image} alt="" />
      <div className="p-6">
        <h5 className="text-gray-900 text-xl font-medium mb-2">{itemCode}</h5>
        <p className="text-gray-700 text-base mb-4 break-words">
          {description}
        </p>
        <p className={`${active ? "bg-green-500" : "bg-red-500"} text-white w-1/4 my-3 text-center`}>
          {active ? i18next.t("active") : i18next.t("desactive")}
        </p>
        <Link to={`/${itemCode}`}>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {i18next.t("viewMore")}
          </button>
        </Link>
      </div>
    </div>
  </div>
  // <div className="grid md:grid-cols-1 lg:grid-cols-2 shadow-md">
  //   <div className="grid">
  //     <img src={image} alt="ItemImage" className="w-full" />
  //   </div>
  //   <div className="grid bg-red-200 p-3">
  //     <p className="text-xl">{itemCode}</p>
  //     <p className="text-sm mt-3 text-clip">{description}</p>
  //     <p className="text-sm">{active ? "Active" : "Desactive"}</p>
  //     <div className="mt-3">
  //       <Link to={`/${itemCode}`}>
  //         <button className="bg-blue-500 text-white p-1">
  //           {i18next.t("viewMore")}
  //         </button>
  //       </Link>
  //     </div>
  //   </div>
  // </div>
);

export default Item;
