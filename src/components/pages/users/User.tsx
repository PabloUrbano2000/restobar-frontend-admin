import { useNavigate } from "react-router";
import { SystemUser } from "../../../types";
import { setFormatDate } from "../../../utils/formats";
interface UserItemProps {
  user: SystemUser;
}

const UserItem = ({ user }: UserItemProps) => {
  const navigate = useNavigate();

  const handleUser = () => {
    navigate(`/usuarios/editar/${user.id}`, { replace: true });
  };

  return (
    <div className="w-full lg:w-2/4 xl:w-1/3 px-4 mb-4">
      <div className="p-3 py-5 shadow-md bg-white w-full flex">
        <div className="sm:w-1/3 rounded-full flex h-auto flex-col">
          <input id={user.id} onClick={handleUser} className="hidden" />
          <label
            htmlFor={user.id}
            className="bg-slate-500 text-center w-24 h-24 flex justify-center items-center text-white font-semibold text-xl cursor-pointer"
            style={{
              padding: "1.5rem",
              borderRadius: "50%",
              margin: "auto",
              textAlign: "center",
            }}
          >
            {user.first_name?.toString()[0].toUpperCase()}
            {user.last_name?.toString()[0].toUpperCase()}
          </label>
        </div>

        <div className="sm:w-2/3 h-full ml-2 my-auto flex flex-col gap-2 p-2">
          <p
            className="text-gray-600 text-md font-medium truncate"
            aria-label={user.email}
          >
            {user.email}
          </p>

          <p className="text-gray-700 text-sm">
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
        </div>
      </div>
    </div>
  );
};

export default UserItem;
