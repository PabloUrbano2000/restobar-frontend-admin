import React from "react";
import { SystemUser } from "../../../types";
import { enviroments } from "../../../env";
import { getCookie } from "../../../utils/cookies";
import { COOKIE_TOKEN } from "../../../utils/constants";
import { PaginateResponse } from "../../../interfaces";
import UserItem from "./User";
import { generateLastPath } from "../../../utils/session";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState<SystemUser[]>([]);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    generateLastPath();
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${enviroments.API_URL}/admin/system-user/list`,
          {
            method: "POST",
            headers: {
              "x-access-token": getCookie(COOKIE_TOKEN) || "",
              "Content-type": "application/json",
            },
          }
        );

        const data: PaginateResponse<SystemUser> = await response.json();
        if (data.status_code === 200) {
          setUsers(data.docs);
        } else {
          setError(data.errors[0] || "Ocurrió un error desconocido");
        }
      } catch (error) {
        setError("Ocurrió un error desconocido");
      }
    };

    getUsers();
  }, []);

  return (
    <>
      <div className="container flex">
        <h1>Usuarios del sistema</h1>
        <Link
          to={"/usuarios/nuevo"}
          replace
          className="ml-auto rounded bg-slate-900 p-3 text-white text-normal"
        >
          Crear usuario
        </Link>
      </div>
      <div className="flex w-full flex-wrap">
        {!isLoading && <div>Spinner</div>}
        {error ? <p>{error}</p> : null}
        {isLoading && users.length > 0
          ? users.map((user) => <UserItem key={user.id} user={user} />)
          : null}
      </div>
    </>
  );
};

export default UsersPage;
