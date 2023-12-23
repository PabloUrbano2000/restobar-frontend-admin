import { useState, useEffect } from "react";
import ClientItem from "./Client";
import { User } from "../../../types";
import Spinner from "../../ui/Spinner";
import { generateLastPath } from "../../../utils/session";
import { getClients } from "../../../services";
const Clients = () => {
  const [clients, setClients] = useState<User[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string>("");

  const [filter, setFilter] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    generateLastPath();

    const getAll = async () => {
      try {
        const data = await getClients({
          limit: 100,
          firstName: filter.firstName,
          lastName: filter.lastName,
          email: filter.email,
        });
        if (data.status_code === 200) {
          setClients(data.docs);
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
      getAll();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filterClients = async () => {
    try {
      const data = await getClients({
        limit: 100,
        firstName: filter.firstName,
        lastName: filter.lastName,
        email: filter.email,
      });
      if (data.status_code === 200) {
        setClients(data.docs);
      } else {
        setError(data.errors[0] || "Ocurrió un error desconocido");
      }
    } catch (error) {
      setError("Ocurrió un error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row container px-4 mx-auto">
        <h1 className="text-center md:text-left font-bold text-lg">
          Ventas realizadas
        </h1>
      </div>
      <div className="flex w-full xl:w-4/6 my-2 container px-4 mx-auto gap-2">
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          type="string"
          placeholder="Nombre"
          value={filter.firstName}
          onChange={(ev) =>
            setFilter({
              ...filter,
              firstName: ev.target.value,
            })
          }
        ></input>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          type="string"
          placeholder="Apellido parteno"
          value={filter.lastName}
          onChange={(ev) =>
            setFilter({
              ...filter,
              lastName: ev.target.value,
            })
          }
        ></input>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          type="string"
          placeholder="Correo electrónico"
          value={filter.email}
          onChange={(ev) =>
            setFilter({
              ...filter,
              email: ev.target.value,
            })
          }
        ></input>
        <button
          className="mt-1 text-center rounded bg-slate-700 px-3 py-2 text-lg text-white text-normal font-bold"
          onClick={filterClients}
        >
          Filtrar
        </button>
      </div>
      <div className="flex w-full flex-wrap">
        {isLoading && <Spinner />}
        {error ? <p>{error}</p> : null}
        {!isLoading && clients.length > 0
          ? clients.map((use: User) => (
              <ClientItem key={use.id} client={use} disableButton={true} />
            ))
          : null}
      </div>
    </>
  );
};

export default Clients;
