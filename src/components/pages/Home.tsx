import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { generateLastPath } from "../../utils/session";
import { Reception } from "../../types";
import {
  getReceptionsWithRequiresAttention,
  serveReception,
} from "../../services";
import Spinner from "../ui/Spinner";
import { showFailToast, showSuccessToast } from "../../utils/toast";
import BarChart from "./charts/BarChart";

const HomePage = () => {
  const [receptions, setReceptions] = useState<Reception[]>([]);

  const { firebase } = useContext(FirebaseContext);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    generateLastPath();

    const getReceptions = async () => {
      try {
        console.log("llego aqui");
        const data = await getReceptionsWithRequiresAttention();
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

    try {
      setIsLoading(true);
      const get = () => {
        firebase?.listenDocumentsUpdateInRealtime("receptions", getReceptions);
      };
      get();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleServeReception = async (id: string) => {
    try {
      setIsLoading(true);
      const data = await serveReception(id || "");
      if (data.status_code === 200) {
        setReceptions(receptions.filter((rec) => rec.id !== id));
        showSuccessToast(data?.message || "");
      } else {
        showFailToast(data?.errors[0] || "");
      }
    } catch (error) {
      showFailToast("Ocurrió un error desconocido");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col container py-12 px-4 mx-auto">
        <div className="flex flex-col my-3">
          <BarChart />
        </div>
        <div className="flex flex-col my-3">
          <p className="font-bold">Mesas que requieren atención:</p>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {error ? <p className="text-sm text-normal">{error}</p> : null}
              {receptions.length === 0 ? (
                <p className="text-sm text-normal">
                  Por el momento no hay mesas que requieran atención
                </p>
              ) : (
                <table className="table-auto bg-white">
                  <thead>
                    <tr>
                      <th>Nro. de mesa</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receptions.map((rec) => (
                      <tr key={rec.id} className="h-14">
                        <td className="text-center">{rec.number_table}</td>
                        <td>
                          <button
                            className="flex mx-auto w-auto text-center ml-auto rounded bg-orange-400 py-1 px-2 text-lg text-white text-normal font-bold"
                            onClick={() => handleServeReception(rec.id || "")}
                          >
                            Atender
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
