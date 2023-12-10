import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import Orden from "./orders/Order";
const Ordenes = () => {
  // context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  const [ordenes, guardarOrdenes] = useState([]);

  useEffect(() => {
    try {
      const obtenerOrdenes = () => {
        firebase?.getDocumentsByFilterInRealtime(
          "orders",
          guardarOrdenes,
          "status",
          1
        );
      };
      obtenerOrdenes();
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Órdenes</h1>
      <div className="sm:flex sm:flex-wrap -mx-3">
        {ordenes.map((orden: any) => (
          <Orden key={orden.id} orden={orden} />
        ))}
      </div>
    </>
  );
};

export default Ordenes;
