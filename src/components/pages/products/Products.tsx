import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { FirebaseContext } from "../../../firebase";
import Platillo from "../../ui/Platillo";

const Menu = () => {
  const { firebase } = useContext(FirebaseContext);
  const [products, saveProducts] = useState([]);

  useEffect(() => {
    const obtenerPlatillos = () => {
      // llamando a los products en tiempo real
      firebase?.getDocumentsRealtime("productos", saveProducts);

      // llamando a los products sin tiempo real
      // const resultado2 = await firebase.getDocuments("productos");
      // console.log(resultado2);
    };

    obtenerPlatillos();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Productos</h1>
      <Link
        to={"/productos/nuevo"}
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Agregar Producto
      </Link>
      {products.map((plat: any) => (
        <Platillo key={plat.id} platillo={plat} />
      ))}
    </>
  );
};

export default Menu;
