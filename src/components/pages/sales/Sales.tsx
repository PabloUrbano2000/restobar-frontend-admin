import {
  useState,
  useEffect,
  // , useContext
} from "react";
// import { FirebaseContext } from "../../../firebase";
import OrderItem from "./Sale";
import { Order } from "../../../types";
import Spinner from "../../ui/Spinner";
import { generateLastPath } from "../../../utils/session";
import {
  // getOrders,
  getSales,
  // inProcessOrder,
  // terminateOrder,
} from "../../../services";
import { formatDatetoYYYYMMDD } from "../../../utils/formats";
// import { showFailToast, showSuccessToast } from "../../../utils/toast";
const Sales = () => {
  // context con las operaciones de firebase
  // const { firebase } = useContext(FirebaseContext);

  const [orders, setOrders] = useState<Order[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string>("");

  const [filter, setFilter] = useState({
    startDate: formatDatetoYYYYMMDD(new Date(), "-"),
    endDate: formatDatetoYYYYMMDD(new Date(), "-"),
  });

  // const [inProcess, setInProcess] = useState(false);

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
      <div className="flex w-full my-2 container px-4 mx-auto">
        <input
          className=""
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
          className=""
          type="date"
          value={filter.endDate}
          onChange={(ev) =>
            setFilter({
              ...filter,
              endDate: formatDatetoYYYYMMDD(new Date(ev.target.value), "-"),
            })
          }
        ></input>
        <button onClick={filterSales}>Filtrar</button>
      </div>
      <div className="flex w-full flex-wrap">
        {isLoading && <Spinner />}
        {error ? <p>{error}</p> : null}
        {!isLoading && orders.length > 0
          ? orders.map((ord: Order) => (
              <OrderItem key={ord.id} order={ord} disableButton={true} />
            ))
          : null}
      </div>
    </>
  );
};

export default Sales;
