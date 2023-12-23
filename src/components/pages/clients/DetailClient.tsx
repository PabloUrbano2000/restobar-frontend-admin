import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";
import { User } from "../../../types";
import { getClientById } from "../../../services";
import { Link } from "react-router-dom";
import { formatDatetoYYYYMMDDHHmmSS } from "../../../utils/formats";

const DetailSale = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [client, setClient] = useState<User | null>(null);

  useEffect(() => {
    if (params.id) {
      const getClient = async () => {
        const data = await getClientById(params?.id || "");
        if (data.status_code == 200) {
          const { user: use } = data?.data || {};
          setClient(use || null);
        } else {
          navigate("/clientes", { replace: true });
        }
      };
      getClient();
    } else {
      navigate("/clientes", { replace: true });
    }
  }, []);

  let currentStatus = "";
  if (client?.status === 1) {
    currentStatus = "HABILITADO";
  } else if (client?.status === 0) {
    currentStatus = "INHABILITADO";
  }
  let createdDate = "";
  if (client?.created_date) {
    createdDate = formatDatetoYYYYMMDDHHmmSS(new Date(client.created_date));
  }

  let updatedDate = "";
  if (client?.updated_date) {
    updatedDate = formatDatetoYYYYMMDDHHmmSS(new Date(client.updated_date));
  }

  let lastLogin = "";

  if (client?.last_login) {
    lastLogin = formatDatetoYYYYMMDDHHmmSS(new Date(client.last_login));
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row container px-4 gap-y-2 mx-auto">
        <h1 className="text-center md:text-left font-bold text-3xl">
          Perfil del cliente
        </h1>

        <Link
          to={"/clientes"}
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
                htmlFor="first_name"
              >
                Nombre(s)
              </label>
              <input
                id="first_name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nombre(s)"
                defaultValue={client?.first_name}
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="last_name"
              >
                Apellido paterno
              </label>
              <input
                id="last_name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Apellido paterno"
                defaultValue={client?.last_name}
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="second_last_name"
              >
                Apellido materno
              </label>
              <input
                id="second_last_name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Apellido materno"
                defaultValue={client?.second_last_name}
              />
            </div>
          </div>

          <div className="flex-col lg:flex-row lg:columns-2 gap-4 xl:columns-3 flex mb-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="document_type"
              >
                Tipo de documento
              </label>
              <input
                id="document_type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Tipo de documento"
                defaultValue={client?.document_type?.name || ""}
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="document_number"
              >
                Nro. de documento
              </label>
              <input
                id="document_number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nro. de documento"
                defaultValue={client?.document_number || ""}
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Género
              </label>
              <input
                id="gender"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Género"
                defaultValue={client?.gender?.name || ""}
              />
            </div>
          </div>

          <div className="flex-col lg:flex-row lg:columns-2 xl:columns-3 gap-4 flex mb-4">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Dirección de residencia
              </label>
              <input
                id="address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Dirección de residencia"
                defaultValue={client?.address || ""}
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
                htmlFor="created_date"
              >
                Fecha/Hora de registro
              </label>
              <input
                id="created_date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Fecha de creación"
                defaultValue={createdDate}
              />
            </div>
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="updated_date"
              >
                Última actualización
              </label>
              <input
                id="updated_date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Última actualización"
                defaultValue={updatedDate}
              />
            </div>

            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="last_login"
              >
                Último inicio de sesión
              </label>
              <input
                id="last_login"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Última inicio de sesión"
                defaultValue={lastLogin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSale;
