import React from "react";
import { SystemUser } from "../../../types";
import UserItem from "./User";
import { generateLastPath } from "../../../utils/session";
import { Link } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import AlertModal from "../../ui/AlertModal";
import {
  disableSystemUser,
  enableSystemUser,
  getSystemUsers,
} from "../../../services";
import { showFailToast, showSuccessToast } from "../../../utils/toast";

const UsersPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState<SystemUser[]>([]);
  const [userSelected, setUserSelected] = React.useState<SystemUser | null>(
    null
  );

  const [error, setError] = React.useState<string>("");

  const [modalState, setModalState] = React.useState(false);
  const [inProcess, setInProcess] = React.useState(false);

  React.useEffect(() => {
    generateLastPath();
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getSystemUsers();
        if (data.status_code === 200) {
          setUsers(data.docs);
        } else {
          setError(data.errors[0] || "Ocurrió un error desconocido");
        }
      } catch (error) {
        setError("Ocurrió un error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleConfirmState = (user: SystemUser) => {
    setUserSelected(user);
    setModalState(true);
  };

  const handleChangeState = async () => {
    try {
      setInProcess(true);
      if (userSelected) {
        const data =
          userSelected.status == 1
            ? await disableSystemUser(userSelected.id || "")
            : await enableSystemUser(userSelected.id || "");
        if (data.status_code === 200) {
          showSuccessToast(data?.message || "");
          setUsers(
            users.map((us) =>
              us.id === data.data?.user?.id
                ? { ...us, status: data.data?.user?.status }
                : us
            )
          );
        } else {
          showFailToast(data?.errors[0] || "");
        }
      }
    } catch (error) {
      showFailToast("Ocurrió un error desconocido");
    } finally {
      setInProcess(false);
      setModalState(false);
    }
  };

  return (
    <>
      <div className="container flex px-4">
        <h1 className="font-bold text-lg">Usuarios del sistema</h1>
        <Link
          to={"/usuarios/nuevo"}
          replace
          className="ml-auto rounded bg-slate-900 py-2 px-4 text-lg text-white text-normal font-bold"
        >
          Crear usuario
        </Link>
      </div>
      <div className="flex w-full flex-wrap">
        {isLoading && <Spinner />}
        {error ? <p>{error}</p> : null}
        {!isLoading && users.length > 0
          ? users.map((user) => (
              <UserItem
                key={user.id}
                onConfirm={handleConfirmState}
                user={user}
              />
            ))
          : null}
      </div>
      <AlertModal
        showModal={modalState}
        offModal={() => setModalState(false)}
        onModal={() => setModalState(true)}
        title={
          userSelected?.status === 1
            ? "Inhabilitar Usuario"
            : "Habilitar Usuario"
        }
        isWarning={userSelected?.status === 1}
        closeButton="Cerrar"
        successButton="Confirmar"
        onSuccess={handleChangeState}
        description={
          userSelected?.status === 1
            ? "Al inhabilitar al usuario no podrá ingresar al sistema"
            : "Al habilitar al usuario podrá ingresar al sistema"
        }
        disableButton={inProcess}
      ></AlertModal>
    </>
  );
};

export default UsersPage;
