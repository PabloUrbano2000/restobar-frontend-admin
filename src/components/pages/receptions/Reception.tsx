import { useRef } from "react";
import { Reception } from "../../../types";
import { useNavigate } from "react-router";
import { formatDatetoYYYYMMDD } from "../../../utils/formats";

interface ProductItemProps {
  reception: Reception;
  onConfirmState: (reception: Reception) => void;
  onConfirmAvaibility: (reception: Reception) => void;
}

const ProductItem = ({
  reception,
  onConfirmState,
  onConfirmAvaibility,
}: ProductItemProps) => {
  const navigate = useNavigate();

  const availableRef = useRef<HTMLSelectElement | null>(null);

  const {
    id,
    code,
    number_table,
    status,
    available = 0,
    created_date,
  } = reception;

  const handleEditReception = () => {
    navigate(`/recepciones/editar/${id}`, { replace: true });
  };
  return (
    <div className="w-full xl:w-1/2 px-4 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="mb-2 xl:mb-0 lg:w-5/12 xl:w-3/12 flex flex-col m-0">
            <div className="md:w-1/3 rounded-full flex h-auto flex-col">
              <input id={id} onClick={handleEditReception} className="hidden" />
              <label
                htmlFor={id}
                className="bg-slate-500 text-center w-24 h-24 flex justify-center items-center text-white font-semibold text-xl cursor-pointer p-6 rounded-full m-auto"
              >
                {number_table?.toUpperCase() || ""}
              </label>
            </div>

            <div className="sm:flex h-1/2 sm:flex-col justify-center">
              <label className="block mt-5 sm:w-auto">
                <span className="block text-gray-800 mb-2">
                  Disponibilidad:
                </span>
                <select
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight outline-none focus:shadow-outline ${
                    status === 0
                      ? "cursor-not-allowed bg-gray-300"
                      : "cursor-pointer bg-white"
                  }`}
                  value={available?.toString()}
                  ref={availableRef}
                  onChange={() => onConfirmAvaibility(reception)}
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
              {code}
            </p>
            <p className="text-gray-600 mb-4">
              Nro. de mesa:{" "}
              <span className="text-gray-700 font-bold">{number_table}</span>
            </p>

            <p className="text-gray-600 mb-4">
              Fecha de creación:{" "}
              <span className="text-gray-700 font-bold">
                {created_date
                  ? formatDatetoYYYYMMDD(new Date(created_date), "-")
                  : null}
              </span>
            </p>
            <div className="w-auto text-gray-900 text-xs">
              Estado:
              <button
                className={`ml-2 p-1 rounded-md text-white text-xs font-semibold ${
                  status === 1 ? "bg-green-500" : "bg-red-500"
                }`}
                onClick={() => onConfirmState(reception)}
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
