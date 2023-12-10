import { useRef } from "react";
import { Product } from "../../../types";
import NoImage from "../../../assets/no-image.png";
import { useNavigate } from "react-router";

interface ProductItemProps {
  product: Product;
  onConfirmState: (product: Product) => void;
  onConfirmAvaibility: (product: Product) => void;
}

const ProductItem = ({
  product,
  onConfirmState,
  onConfirmAvaibility,
}: ProductItemProps) => {
  const navigate = useNavigate();

  const availableRef = useRef<HTMLSelectElement | null>(null);

  const {
    id,
    name,
    category,
    status,
    image,
    available = 0,
    price,
    description = "",
  } = product;

  const handleEditProduct = () => {
    navigate(`/productos/editar/${id}`, { replace: true });
  };
  return (
    <div className="w-full xl:w-1/2 px-4 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="mb-2 xl:mb-0 lg:w-5/12 xl:w-3/12 flex flex-col m-0">
            <input
              id={id}
              type="button"
              className="hidden"
              onClick={handleEditProduct}
            />
            <label
              htmlFor={product.id}
              className="cursor-pointer flex flex-col h-1/2 relative"
            >
              <img
                className="h-full max-h-60 w-fit m-auto xl:m-0 xl:max-h-none xl:w-full xl:absolute"
                src={image ? image : NoImage}
                alt={name}
              />
            </label>
            <div className="sm:flex h-1/2 sm:flex-col justify-center">
              <label className="block mt-5 sm:w-auto">
                <span className="block text-gray-800 mb-2">Existencia</span>
                <select
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight outline-none focus:shadow-outline ${
                    status === 0
                      ? "cursor-not-allowed bg-gray-300"
                      : "cursor-pointer bg-white"
                  }`}
                  value={available?.toString()}
                  ref={availableRef}
                  onChange={() => onConfirmAvaibility(product)}
                  disabled={status === 0}
                >
                  <option value="1">Disponible</option>
                  <option value="0">No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className="xl:pl-5 lg:w-7/12 xl:w-9/12">
            <p className="font-bold text-2xl text-yellow-600 mb-4 uppercase break-words truncate">
              {name}
            </p>
            <p className="text-gray-600 mb-4">
              Categoría:{" "}
              <span className="text-gray-700 font-bold">{category?.name}</span>
            </p>
            <p
              className="text-gray-600 mb-4 break-words text-sm truncate"
              aria-label={description}
            >
              {description.length > 100
                ? `${description.substring(0, 97)}...`
                : description}
            </p>
            <p className="text-gray-600 mb-4">
              Precio:{" "}
              <span className="text-gray-700 font-bold">
                S/. {price?.toFixed(2)}
              </span>
            </p>
            <div className="w-auto text-gray-900 text-xs">
              Estado:
              <button
                className={`ml-2 p-1 rounded-md text-white text-xs font-semibold ${
                  status === 1 ? "bg-green-500" : "bg-red-500"
                }`}
                onClick={() => onConfirmState(product)}
              >
                {status === 1 ? "Habilitado" : "Inhabilitado"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
