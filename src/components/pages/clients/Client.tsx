import { User } from "../../../types";
import { useNavigate } from "react-router-dom";
import { setFormatDate } from "../../../utils/formats";

interface ClientItemProps {
  client: User;
  disableButton: boolean;
}

const ClientItem = ({ client }: ClientItemProps) => {
  const navigate = useNavigate();

  const handleDetailClient = () => navigate(`/clientes/${client.id}`);

  return (
    <div className="w-full lg:w-2/4 xl:w-1/3 px-4 mb-4">
      <div className="flex flex-col md:flex-row p-3 py-5 shadow-md bg-white w-full relative">
        <div className="md:w-1/3 rounded-full flex h-auto flex-col">
          <input
            id={client.id}
            onClick={handleDetailClient}
            className="hidden"
          />
          <label
            htmlFor={client.id}
            className="bg-slate-500 text-center w-24 h-24 flex justify-center items-center text-white font-semibold text-xl cursor-pointer p-6 rounded-full m-auto"
          >
            {client.first_name?.toString()[0].toUpperCase()}
            {client.last_name?.toString()[0].toUpperCase()}
          </label>
        </div>

        <div className="md:w-2/3 h-full ml-2 my-auto flex flex-col gap-2 p-2">
          <p
            className="text-gray-600 text-md font-medium truncate"
            aria-label={client.email}
          >
            {client.email}
          </p>

          <p className="text-gray-700 text-sm truncate">
            Nombre: {client.first_name} {client.last_name}
          </p>

          <p className="text-gray-700 text-xs">
            Fecha de creación:{" "}
            <span className="font-bold">
              {setFormatDate({
                date: client.created_date,
                order: 0,
                separator: "-",
              })}
            </span>
          </p>

          <p className="text-gray-700 text-xs">
            {client.last_login ? (
              <>
                Último inicio:{" "}
                <span className="font-bold">
                  {setFormatDate({
                    date: client.last_login,
                    order: 0,
                    separator: "-",
                  })}
                </span>
              </>
            ) : (
              <>&nbsp;</>
            )}
          </p>
          <div className="w-auto text-gray-900 text-xs">
            Estado:
            {client.status === 1 ? "Habilitado" : "Inhabilitado"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientItem;
