import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router";
import { createReception } from "../../../services";
import { showFailToast, showSuccessToast } from "../../../utils/toast";
import { Link } from "react-router-dom";

const NewReceptionPage = () => {
  // // Hook para redireccionar
  const navigate = useNavigate();

  const [inProcess, setInProcess] = useState(false);

  // validacion y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      code: "",
      number_table: "",
      status: "",
      available: "",
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required("El código de la recepción es obligatorio")
        .matches(/^[R][0-9]{6}$/, "Formato de código inválido"),
      number_table: Yup.string()
        .required("El número de mesa de la recepción es obligatorio")
        .matches(/^[0-9]{3}$/, "Formato de número de mesa inválido"),
      available: Yup.string().required(
        "La disponibilidad de la recepción es obligatoria"
      ),
      status: Yup.string().required("El estado de la recepción es obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        setInProcess(true);

        let available = 1;
        if (
          parseInt(values.available) === 1 ||
          parseInt(values.available) === 0
        ) {
          available = parseInt(values.available);
        }

        let status = 1;
        if (parseInt(values.status) === 1 || parseInt(values.status) === 0) {
          status = parseInt(values.status);
        }

        const data = await createReception({
          code: values.code,
          number_table: values.number_table,
          available,
          status,
        });

        if (data.status_code == 200) {
          showSuccessToast(data.message || "Recepción registrada éxitosamente");
          navigate("/recepciones", {
            replace: true,
          });
        } else {
          showFailToast(data?.errors[0] || "");
        }
      } catch (error) {
        console.log(error);
        showFailToast("Ocurrió un error desconocido");
      } finally {
        setInProcess(false);
      }
    },
  });

  return (
    <>
      <div className="flex flex-col md:flex-row container px-4 gap-y-2 mx-auto">
        <h1 className="text-center md:text-left font-bold text-3xl">
          Crear recepción
        </h1>
        <Link
          to={"/recepciones"}
          replace
          className="w-full md:w-auto text-center ml-auto rounded bg-slate-900 py-2 px-4 text-lg text-white text-normal font-bold"
        >
          Volver
        </Link>
      </div>
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="code"
              >
                Código
              </label>
              <input
                id="code"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Código recepción"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.code && formik.errors.code ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik?.errors?.code}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="number_table"
              >
                Número de mesa
              </label>
              <input
                id="number_table"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nro. de mesa"
                value={formik.values.number_table}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.number_table && formik.errors.number_table ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik?.errors?.number_table}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="available"
              >
                Disponibilidad
              </label>
              <select
                id="available"
                name="available"
                value={formik.values.available}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">-- Seleccione --</option>
                <option value="1">Disponible</option>
                <option value="0">Indisponible</option>
              </select>
            </div>
            {formik.touched.available && formik.errors.available ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik.errors.available}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Estado
              </label>
              <select
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">-- Seleccione --</option>
                <option value="1">Habilitado</option>
                <option value="0">Inhabilitado</option>
              </select>
            </div>
            {formik.touched.status && formik.errors.status ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik.errors.status}</p>
              </div>
            ) : null}

            <input
              type={"submit"}
              disabled={inProcess}
              className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
              value="Crear Recepción"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewReceptionPage;
