import { Order } from "../../../types";
import { Link } from "react-router-dom";
import { formatDatetoYYYYMMDDHHmmSS } from "../../../utils/formats";

interface SaleItemProps {
  sale: Order;
  disableButton: boolean;
}

const SaleItem = ({ sale }: SaleItemProps) => {
  return (
    <div className="w-full lg:w-1/2 xl:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md bg-white relative">
        <Link
          to={`/ventas/${sale.id}`}
          replace
          className="absolute ml-2 p-1 rounded-md text-white text-xs font-semibold bg-orange-400 right-2 top-2"
        >
          ver detalle
        </Link>
        <h1 className="text-yellow-600 text-lg font-bold">
          {sale.order_number}
        </h1>

        <p className="text-gray-700 font-bold mb-2">
          Total a Pagar: S/. {sale?.total?.toFixed(2)}
        </p>
        <p className="text-gray-700 text-sm mb-2 font-normal">
          Nro documento: {sale.user_document_number}
        </p>
        <p className="text-gray-700 text-sm mb-2 font-normal">
          Método pago: {sale.payment_method}
        </p>
        <p className="text-gray-700 text-sm mb-2 font-normal">
          Canal: {sale.order_channel}
        </p>
        <p className="text-gray-700 text-sm mb-2">
          Fecha/Hora de recepción:{" "}
          <span className="font-bold">
            {formatDatetoYYYYMMDDHHmmSS(new Date(sale.reception_date))}
          </span>
        </p>
        {sale.status === 3 ? (
          <p className="text-gray-700 text-sm mb-2">
            Fecha/Hora de entrega:{" "}
            <span className="font-bold">
              {formatDatetoYYYYMMDDHHmmSS(new Date(sale.end_date))}
            </span>
          </p>
        ) : null}

        {sale.status === 3 && sale.estimated_time > 0 && (
          <p className="text-gray-700">
            Tiempo de Entrega:{" "}
            <span className="font-bold">{sale.estimated_time} minutos</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SaleItem;
