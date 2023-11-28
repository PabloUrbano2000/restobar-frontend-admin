import { useContext, useRef } from "react";

import { FirebaseContext } from "../../firebase";

const Platillo = ({ platillo }: { platillo: any }) => {
  // Existencia ref para acceder al valor directamente
  const existenciaRef = useRef(platillo.existencia);

  // context de firebase para cambios en la BD
  const { firebase } = useContext(FirebaseContext);

  const { id, nombre, imagen, existencia, categoria, precio, descripcion } =
    platillo;

  const actualizarDisponibilidad = async () => {
    const exists = existenciaRef.current.value === "true";
    try {
      const cuerpo = {
        nombre,
        imagen,
        categoria,
        precio,
        descripcion,
        existencia: exists,
      };
      const resultado = await firebase?.updateDocument("productos", id, cuerpo);
      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={imagen} alt={nombre} />
            <div className="sm:flex sm:-mx-2 pl-3">
              <label className="block mt-5 sm:w-2/4">
                <span className="block text-gray-800 mb-2">Existencia</span>
                <select
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight outline-none focus:shadow-outline"
                  value={existencia}
                  ref={existenciaRef}
                  onChange={() => actualizarDisponibilidad()}
                >
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className="pl-5 lg:w-7/12 xl:w-9/12">
            <p className="font-bold text-2xl text-yellow-600 mb-4">{nombre}</p>
            <p className="text-gray-600 mb-4">
              Categoría:{" "}
              <span className="text-gray-700 font-bold">
                {categoria.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-600 mb-4">{descripcion}</p>
            <p className="text-gray-600 mb-4">
              Precio:{" "}
              <span className="text-gray-700 font-bold">S/. {precio}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platillo;
