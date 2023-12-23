import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";
import { Order } from "../../../types";
import { getOrderById } from "../../../services";
import { Link } from "react-router-dom";
import { formatDatetoYYYYMMDDHHmmSS } from "../../../utils/formats";

const DetailSale = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (params.id) {
      const getOrder = async () => {
        const data = await getOrderById(params?.id || "");
        if (data.status_code == 200) {
          const { order: ord } = data?.data || {};
          setOrder(ord || null);
        } else {
          navigate("/pedidos", { replace: true });
        }
      };
      getOrder();
    } else {
      navigate("/pedidos", { replace: true });
    }
  }, []);

  let client = "";
  if (order?.client.first_name && order.client.last_name) {
    client = `${order?.client.first_name} ${order?.client.last_name}`;
  }

  let reception = "";
  if (order?.reception.number_table) {
    reception = order.reception.number_table;
  }

  let currentStatus = "";
  if (order?.status === 1) {
    currentStatus = "PENDIENTE DE TOMAR";
  } else if (order?.status === 2) {
    currentStatus = "EN PROCESO";
  } else if (order?.status === 3) {
    currentStatus = "TERMINADA";
  }

  let receptionDate = "";

  if (order?.reception_date) {
    receptionDate = formatDatetoYYYYMMDDHHmmSS(new Date(order.reception_date));
  }

  let endDate = "";
  if (order?.end_date) {
    endDate = formatDatetoYYYYMMDDHHmmSS(new Date(order.end_date));
  }

  return (
    <>
      <div className="flex flex-col md:flex-row container px-4 gap-y-2 mx-auto">
        <h1 className="text-center md:text-left font-bold text-3xl">
          Detalle de la Orden
        </h1>

        <Link
          to={"/pedidos"}
          replace
          className="w-full md:w-auto text-center ml-auto rounded bg-slate-900 py-2 px-4 text-lg text-white text-normal font-bold"
        >
          Volver
        </Link>
      </div>
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-3xl">
          <div className="flex-col lg:flex-row lg:columns-2 gap-4 xl:columns-3 flex mb-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="order_number"
              >
                Número de orden
              </label>
              <input
                id="order_number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nro. de orden"
                defaultValue={order?.order_number}
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="client"
              >
                Cliente
              </label>
              <input
                id="client"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nombre del cliente"
                defaultValue={client}
              />
            </div>

            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="reception"
              >
                Nro. de mesa
              </label>
              <input
                id="client"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nro. de mesa"
                defaultValue={reception}
              />
            </div>
          </div>

          <div className="flex-col lg:flex-row lg:columns-2 xl:columns-3 gap-4 flex mb-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="payment_method"
              >
                Método de pago
              </label>
              <input
                id="payment_method"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Método de pago"
                defaultValue={order?.payment_method || ""}
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="order_channel"
              >
                Canal de solicitud
              </label>
              <input
                id="order_channel"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Método de pago"
                defaultValue={order?.order_channel || ""}
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Estado
              </label>
              <input
                id="status"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Estado"
                defaultValue={currentStatus}
              />
            </div>
          </div>

          <div className="flex-col lg:flex-row lg:columns-2 xl:columns-3 gap-4 flex mb-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="reception_date"
              >
                Fecha/Hora de recepción
              </label>
              <input
                id="reception_date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Fecha de recepción"
                defaultValue={receptionDate}
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="end_date"
              >
                Fecha/Hora de entrega
              </label>
              <input
                id="end_date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Fecha de entrega"
                defaultValue={endDate}
              />
            </div>
          </div>

          <div className="flex-col lg:flex-row lg:columns-2 xl:columns-3 gap-4 flex mb-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subtotal"
              >
                Subtotal
              </label>
              <input
                id="subtotal"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Subtotal"
                defaultValue={order?.subtotal?.toFixed(2)}
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="total"
              >
                Total a pagar
              </label>
              <input
                id="total"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Total"
                defaultValue={order?.total?.toFixed(2)}
              />
            </div>
          </div>

          <div className="mb-4 overflow-auto">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="items"
            >
              Productos ordenados
            </label>
            <div className="overflow-auto w-full">
              <table
                className="table-fixed w-full overflow-auto"
                style={{
                  minWidth: 600,
                }}
              >
                <thead>
                  <tr>
                    <th className="text-center">Item</th>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Precio de venta</th>
                    <th className="text-center">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.items?.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="text-center">{item.product.id}</td>
                        <td className="text-center">{item.product.name}</td>
                        <td className="text-center">
                          {item.price_of_sale.toFixed(2)}
                        </td>
                        <td className="text-center">
                          {item.quantity.toString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSale;
