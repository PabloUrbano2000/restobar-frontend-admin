import React from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { recoveryPassword } from "../../../services";

const RecoveryPasswordPage = () => {
  const navigate = useNavigate();
  const [onProccess, setOnProccess] = React.useState(false);

  // validacion y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Formato de correo inválido")
        .required("El correo es obligatorio"),
    }),
    onSubmit: async ({ email }) => {
      try {
        setOnProccess(true);

        const data = await recoveryPassword({
          email,
        });

        if (data.status_code == 200) {
          toast.success(data.message || "", {
            position: "top-right",
            duration: 3000,
          });

          navigate("/auth/login", { replace: true });
        } else {
          toast.error(data?.errors[0], {
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        toast.error("Ocurrió un error desconocido", {
          position: "top-right",
          duration: 3000,
        });
      } finally {
        setOnProccess(false);
      }
    },
  });

  return (
    <>
      <div
        className="flex justify-center w-11/12 rounded flex-col bg-slate-100 md:w-6/12 shadow-lg p-5 my-5"
        style={{
          maxWidth: "500px",
        }}
      >
        <h1 className="text-3xl mb-4 text-center font-semibold uppercase my-2">
          Recuperar contraseña
        </h1>
        <div className="w-full flex flex-col p-3">
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Correo electrónico"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik?.errors?.email}</p>
              </div>
            ) : null}
            <Link
              to={"/auth/login"}
              className="ml-auto text-blue-950 text-sm hover:text-blue-800"
            >
              Ya recordé mi contraseña
            </Link>
            <input
              type={"submit"}
              disabled={onProccess}
              className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
              value="Recuperar contraseña"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default RecoveryPasswordPage;
