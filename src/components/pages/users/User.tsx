import { useNavigate } from "react-router";
import { SystemUser } from "../../../types";
import { setFormatDate } from "../../../utils/formats";

interface UserItemProps {
  user: SystemUser;
  onConfirm: (user: SystemUser) => void;
}

const UserItem = ({ user, onConfirm }: UserItemProps) => {
  const navigate = useNavigate();

  const handleEditUser = () => {
    navigate(`/usuarios/editar/${user.id}`, { replace: true });
  };

  return (
    <div className="w-full lg:w-2/4 xl:w-1/3 px-4 mb-4">
      <div className="flex flex-col md:flex-row p-3 py-5 shadow-md bg-white w-full relative">
        <div className="md:w-1/3 rounded-full flex h-auto flex-col">
          <input id={user.id} onClick={handleEditUser} className="hidden" />
          <label
            htmlFor={user.id}
            className="bg-slate-500 text-center w-24 h-24 flex justify-center items-center text-white font-semibold text-xl cursor-pointer p-6 rounded-full m-auto"
          >
            {user.first_name?.toString()[0].toUpperCase()}
            {user.last_name?.toString()[0].toUpperCase()}
          </label>
        </div>

        <div className="md:w-2/3 h-full ml-2 my-auto flex flex-col gap-2 p-2">
          <p
            className="text-gray-600 text-md font-medium truncate"
            aria-label={user.email}
          >
            {user.email}
          </p>

          <p className="text-gray-700 text-sm truncate">
            Nombre: {user.first_name} {user.last_name}
          </p>

          <p className="text-gray-700 text-xs">
            Fecha de creación:{" "}
            <span className="font-bold">
              {setFormatDate({
                date: user.created_date,
                order: 0,
                separator: "-",
              })}
            </span>
          </p>

          <p className="text-gray-700 text-xs">
            {user.last_login ? (
              <>
                Último inicio:{" "}
                <span className="font-bold">
                  {setFormatDate({
                    date: user.last_login,
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
            <button
              className={`ml-2 p-1 rounded-md text-white text-xs font-semibold ${
                user.status === 1 ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={() => onConfirm(user)}
            >
              {user.status === 1 ? "Habilitado" : "Inhabilitado"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
