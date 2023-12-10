import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../../firebase";
import OrderItem from "./Order";
import { Order } from "../../../types";
import Spinner from "../../ui/Spinner";
import { generateLastPath } from "../../../utils/session";
import { getOrders, inProcessOrder, terminateOrder } from "../../../services";
import { showFailToast, showSuccessToast } from "../../../utils/toast";
const Orders = () => {
  // context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  const [orders, setOrders] = useState<Order[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string>("");

  const [inProcess, setInProcess] = useState(false);

  useEffect(() => {
    generateLastPath();

    const getAll = async () => {
      try {
        const data = await getOrders();
        if (data.status_code === 200) {
          setOrders(data.docs);
        } else {
          setError(data.errors[0] || "Ocurrió un error desconocido");
        }
      } catch (error) {
        setError("Ocurrió un error desconocido");
      }
    };

    try {
      setIsLoading(true);
      const getOrders = () => {
        firebase?.listenDocumentsUpdateInRealtime("orders", getAll);
      };
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChangeStateToInProcess = async (
    order: Order,
    estimatedTime: number
  ) => {
    if (order.id && order.status == 1 && estimatedTime > 0) {
      try {
        setInProcess(true);
        const data = await inProcessOrder(order.id || "", estimatedTime);
        if (data.status_code === 200) {
          showSuccessToast(data?.message || "");
        } else {
          showFailToast(data?.errors[0] || "");
        }
      } catch (error) {
        showFailToast("Ocurrió un error desconocido");
      } finally {
        setInProcess(false);
      }
    }
  };

  const handleChangeStateToTerminate = async (order: Order) => {
    if (order.id && order.status == 2) {
      try {
        setInProcess(true);
        const data = await terminateOrder(order.id || "");
        if (data.status_code === 200) {
          showSuccessToast(data?.message || "");
        } else {
          showFailToast(data?.errors[0] || "");
        }
      } catch (error) {
        showFailToast("Ocurrió un error desconocido");
      } finally {
        setInProcess(false);
      }
    }
  };

  return (
    <>
      <div className="container flex px-4">
        <h1 className="font-bold text-lg">Pedidos</h1>
      </div>

      <div className="flex w-full flex-wrap">
        {!isLoading && <Spinner />}
        {error ? <p>{error}</p> : null}
        {isLoading && orders.length > 0
          ? orders.map((ord: Order) => (
              <OrderItem
                key={ord.id}
                order={ord}
                disableButton={inProcess}
                onInProcess={handleChangeStateToInProcess}
                onTerminate={handleChangeStateToTerminate}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default Orders;
