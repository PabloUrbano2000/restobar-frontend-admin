import { useState, useEffect } from "react";
import OrderItem from "./Sale";
import { Order } from "../../../types";
import Spinner from "../../ui/Spinner";
import { generateLastPath } from "../../../utils/session";
import { getSales } from "../../../services";
import { formatDatetoYYYYMMDD } from "../../../utils/formats";
const Sales = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string>("");

  const [filter, setFilter] = useState({
    startDate: formatDatetoYYYYMMDD(new Date(), "-"),
    endDate: formatDatetoYYYYMMDD(new Date(), "-"),
  });

  useEffect(() => {
    generateLastPath();

    const getAll = async () => {
      try {
        const data = await getSales({
          limit: 100,
          startDate: filter.startDate,
          endDate: filter.endDate,
        });
        if (data.status_code === 200) {
          setOrders(data.docs);
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

  const filterSales = async () => {
    try {
      const data = await getSales({
        limit: 100,
        startDate: filter.startDate,
        endDate: filter.endDate,
      });
      if (data.status_code === 200) {
        setOrders(data.docs);
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
          type="date"
          value={filter.startDate}
          onChange={(ev) =>
            setFilter({
              ...filter,
              startDate: formatDatetoYYYYMMDD(new Date(ev.target.value), "-"),
            })
          }
        ></input>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          type="date"
          value={filter.endDate}
          onChange={(ev) =>
            setFilter({
              ...filter,
              endDate: formatDatetoYYYYMMDD(new Date(ev.target.value), "-"),
            })
          }
        ></input>
        <button
          className="mt-1 text-center rounded bg-slate-700 px-3 py-2 text-lg text-white text-normal font-bold"
          onClick={filterSales}
        >
          Filtrar
        </button>
      </div>
      <div className="flex w-full flex-wrap">
        {isLoading && <Spinner />}
        {error ? <p>{error}</p> : null}
        {!isLoading && orders.length > 0
          ? orders.map((sal: Order) => (
              <OrderItem key={sal.id} sale={sal} disableButton={true} />
            ))
          : null}
      </div>
    </>
  );
};

export default Sales;
