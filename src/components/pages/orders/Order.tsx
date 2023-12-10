import { useState } from "react";
import { Order } from "../../../types";
import { Link } from "react-router-dom";
import { formatDatetoYYYYMMDDHHmmSS } from "../../../utils/formats";

interface OrderItemProps {
  order: Order;
  disableButton: boolean;
  onInProcess: (order: Order, estimatedTime: number) => void;
  onTerminate: (order: Order) => void;
}

const OrderItem = ({
  order,
  onInProcess,
  onTerminate,
  disableButton,
}: OrderItemProps) => {
  const [defineEstimatedTime, setDefineEstimatedTime] = useState("0");

  return (
    <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md bg-white relative">
        <Link
          to={`/ordenes/${order.id}`}
          replace
          className="absolute ml-2 p-1 rounded-md text-white text-xs font-semibold bg-orange-400 right-2 top-2"
        >
          ver detalle
        </Link>
        <h1 className="text-yellow-600 text-lg font-bold">
          {order.order_number}
        </h1>

        <p className="text-gray-700 font-bold mb-2">
          Total a Pagar: S/. {order?.total?.toFixed(2)}
        </p>
        <p className="text-gray-700 text-sm mb-2 font-normal">
          Nro documento: {order.user_document_number}
        </p>
        <p className="text-gray-700 text-sm mb-2 font-normal">
          Método pago: {order.payment_method}
        </p>
        <p className="text-gray-700 text-sm mb-2 font-normal">
          Canal: {order.order_channel}
        </p>
        <p className="text-gray-700 text-sm mb-2">
          Fecha/Hora de recepción:{" "}
          <span className="font-bold">
            {formatDatetoYYYYMMDDHHmmSS(new Date(order.reception_date))}
          </span>
        </p>
        {order.status === 3 ? (
          <p className="text-gray-700">
            Fecha/Hora de entrega:{" "}
            <span className="font-bold">
              {formatDatetoYYYYMMDDHHmmSS(new Date(order.end_date))}
            </span>
          </p>
        ) : null}

        {order.status === 1 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tiempo de entrega (min)
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="60"
              placeholder="20"
              value={defineEstimatedTime}
              onChange={(e) => setDefineEstimatedTime(e.target.value)}
            />
            <button
              onClick={() => onInProcess(order, parseInt(defineEstimatedTime))}
              disabled={
                !defineEstimatedTime ||
                parseInt(defineEstimatedTime) > 60 ||
                disableButton
              }
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 w-full mt-5 p-2 text-white uppercase font-bold"
            >
              Definir Tiempo
            </button>
          </div>
        )}
        {order.status === 2 && order.estimated_time > 0 && (
          <p className="text-gray-700">
            Tiempo de entrega:{" "}
            <span className="font-bold">{order.estimated_time} minutos</span>
          </p>
        )}
        {order.status === 2 && order.estimated_time > 0 && (
          <button
            type="button"
            disabled={disableButton}
            onClick={() => onTerminate(order)}
            className="bg-blue-800 hover:bg-blue-700 disabled:bg-blue-400 w-full mt-5 p-2 text-white uppercase font-bold"
          >
            Marcar como lista
          </button>
        )}
        {order.status === 3 && order.estimated_time > 0 && (
          <p className="text-gray-700">
            Tiempo de Entrega:{" "}
            <span className="font-bold">{order.estimated_time} minutos</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
