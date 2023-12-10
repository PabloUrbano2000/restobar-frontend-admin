import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import { FirebaseContext } from "../../../firebase";
import ReceptionItem from "./Reception";
import { Reception } from "../../../types";
import Spinner from "../../ui/Spinner";
import { generateLastPath } from "../../../utils/session";
import {
  availableReception,
  disableReception,
  enableReception,
  getReceptions,
  unavailableReception,
} from "../../../services";
import AlertModal from "../../ui/AlertModal";
import { showFailToast, showSuccessToast } from "../../../utils/toast";

const ReceptionsPage = () => {
  const [products, setReceptions] = useState<Reception[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [receptionSelected, setReceptionSelected] = useState<Reception | null>(
    null
  );

  const [error, setError] = useState<string>("");

  const [modalAvaibility, setModalAvaibility] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [inProcess, setInProcess] = useState(false);

  useEffect(() => {
    generateLastPath();

    const getAll = async () => {
      try {
        setIsLoading(true);
        const data = await getReceptions();
        if (data.status_code === 200) {
          setReceptions(data.docs);
        } else {
          setError(data.errors[0] || "Ocurrió un error desconocido");
        }
      } catch (error) {
        setError("Ocurrió un error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    getAll();
  }, []);

  const handleConfirmState = (reception: Reception) => {
    setReceptionSelected(reception);
    setModalState(true);
  };

  const handleChangeState = async () => {
    try {
      setInProcess(true);
      if (receptionSelected) {
        const data =
          receptionSelected.status == 1
            ? await disableReception(receptionSelected.id || "")
            : await enableReception(receptionSelected.id || "");
        if (data.status_code === 200) {
          showSuccessToast(data?.message || "");
          setReceptions(
            products.map((pro) =>
              pro.id === data.data?.reception?.id
                ? { ...pro, status: data.data?.reception?.status }
                : pro
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

  const handleConfirmAvaibility = (reception: Reception) => {
    setReceptionSelected(reception);
    setModalAvaibility(true);
  };

  const handleChangeAvaibility = async () => {
    try {
      setInProcess(true);
      if (receptionSelected) {
        const data =
          receptionSelected.available == 1
            ? await unavailableReception(receptionSelected.id || "")
            : await availableReception(receptionSelected.id || "");
        if (data.status_code === 200) {
          showSuccessToast(data?.message || "");
          setReceptions(
            products.map((pro) =>
              pro.id === data.data?.reception?.id
                ? { ...pro, available: data.data?.reception?.available }
                : pro
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
      setModalAvaibility(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row container px-4 mx-auto">
        <h1 className="text-center md:text-left font-bold text-lg">
          Recepciones
        </h1>
        <Link
          to={"/recepciones/nuevo"}
          replace
          className="w-full md:w-auto text-center ml-auto rounded bg-slate-900 py-2 px-4 text-lg text-white text-normal font-bold"
        >
          Crear recepción
        </Link>
      </div>

      <div className="flex w-full flex-wrap">
        {isLoading && <Spinner />}
        {error ? <p>{error}</p> : null}
        {!isLoading && products.length > 0
          ? products.map((rec: Reception) => (
              <ReceptionItem
                key={rec.id}
                reception={rec}
                onConfirmAvaibility={handleConfirmAvaibility}
                onConfirmState={handleConfirmState}
              />
            ))
          : null}
      </div>
      <AlertModal
        showModal={modalAvaibility}
        offModal={() => setModalAvaibility(false)}
        onModal={() => setModalAvaibility(true)}
        title={
          receptionSelected?.available === 1
            ? "Disponibilizar Recepción"
            : "Indisponibilizar Recepción"
        }
        closeButton="Cerrar"
        successButton="Confirmar"
        onSuccess={handleChangeAvaibility}
        isWarning={receptionSelected?.available === 1}
        description={
          receptionSelected?.available === 1
            ? "Al poner indisponible la recepción este no podrá ser reservado por los clientes"
            : "Al poner disponible la recepción este podrá ser reservado por los clientes"
        }
        disableButton={inProcess}
      ></AlertModal>
      <AlertModal
        showModal={modalState}
        offModal={() => setModalState(false)}
        onModal={() => setModalState(true)}
        title={
          receptionSelected?.status === 1
            ? "Inhabilitar Recepción"
            : "Habilitar Recepción"
        }
        closeButton="Cerrar"
        successButton="Confirmar"
        onSuccess={handleChangeState}
        isWarning={receptionSelected?.status === 1}
        description={
          receptionSelected?.status === 1
            ? "Al inhabilitar la recepción este no podrá ser visible para los clientes"
            : "Al habilitar la recepción este será visible para los clientes"
        }
        disableButton={inProcess}
      ></AlertModal>
    </>
  );
};

export default ReceptionsPage;
