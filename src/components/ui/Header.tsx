import { useAuthContext } from "../../context/AuthContext";
import { enviroments } from "../../env";
import { getCookie } from "../../utils/cookies";
import { COOKIE_TOKEN } from "../../utils/constants";

const Header = () => {
  const { user, cleanAuth } = useAuthContext();

  const logout = () => {
    fetch(`${enviroments.API_URL}/admin/auth/logout`, {
      method: "POST",
      headers: {
        "x-access-token": getCookie(COOKIE_TOKEN) || "",
      },
    });
    cleanAuth();
  };

  return (
    <header
      className="flex w-full gap-3"
      style={{
        backgroundColor: "#181924",
        height: "10vh",
        padding: "0 25px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div className="flex items-center flex-col justify-center">
        <p className="text-white text-center">
          <span className="font-semibold">Rol:</span> {user?.role?.alias}
        </p>
      </div>
      <div className="flex items-center flex-col justify-center">
        <p className="text-white text-center">
          <span className="font-semibold">Usuario:</span> {user?.first_name}{" "}
          {user?.last_name}
        </p>
      </div>
      <div className="flex items-center flex-col justify-center ml-auto">
        {user ? (
          <button
            className="text-white font-medium p-2 rounded-md"
            style={{
              background: "cornflowerblue",
            }}
            onClick={logout}
          >
            Cerrar Sesión
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
