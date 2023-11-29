import React from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router";
import { enviroments } from "../../../env";
import { DocumentResponse } from "../../../interfaces";
import { SystemUser } from "../../../types";
import { Link, useSearchParams } from "react-router-dom";

const RestorePasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [isValidToken, setIsValidToken] = React.useState(false);
  const [onProccess, setOnProccess] = React.useState(false);

  React.useEffect(() => {
    const verifyPassToken = async () => {
      const token = searchParams.get("token");

      if (token) {
        const response = await fetch(
          `${enviroments.API_URL}/admin/auth/password/verify`,
          {
            method: "POST",
            headers: {
              "x-access-token": token,
            },
          }
        );
        const data: DocumentResponse<null> = await response.json();
        if (data.status_code === 200) {
          setIsValidToken(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        navigate("/auth/login", { replace: true });
      }
    };
    verifyPassToken();
  }, []);

  // validacion y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("La nueva contraseña es obligatoria")
        .min(8, "La nueva contraseña debe tener entre 8 a 16 caracteres")
        .max(16, "La nueva contraseña debe tener entre 8 a 16 caracteres"),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Las contraseñas no coinciden"
      ),
    }),
    onSubmit: async (datos) => {
      try {
        setOnProccess(true);

        const token = searchParams.get("token");

        const result = await fetch(
          `${enviroments.API_URL}/admin/auth/password/change`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token || "",
            },
            body: JSON.stringify({
              new_password: datos.password,
              confirm_password: datos.confirm_password,
            }),
          }
        );

        const data: DocumentResponse<SystemUser> = await result.json();

        if (data.status_code == 200) {
          console.log("resultado", data);

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
          minHeight: "200px",
        }}
      >
        {loading ? <div>Spinner</div> : null}
        {!loading && !isValidToken ? (
          <div>
            <h2 className="text-3xl mb-4 text-center font-semibold uppercase my-2">
              Su token ha expirado, por favor vuelva a solicitar la recuperación
            </h2>
            <Link
              to={"/auth/recovery"}
              replace
              className="text-center mx-auto block text-blue-950 text-sm hover:text-blue-800"
            >
              Ir a recuperar mi contraseña
            </Link>
          </div>
        ) : null}

        {!loading && isValidToken ? (
          <>
            <h1 className="text-3xl mb-4 text-center font-semibold uppercase my-2">
              Cambiar contraseña
            </h1>
            <div className="w-full flex flex-col p-3">
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col w-full"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Nueva Contraseña
                  </label>
                  <input
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Contraseña"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                    role={"alert"}
                  >
                    <p className="font-bold">Hubo un error:</p>
                    <p className="">{formik.errors.password}</p>
                  </div>
                ) : null}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="confirm_password"
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    id="confirm_password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Repita la contraseña"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.confirm_password &&
                formik.errors.confirm_password ? (
                  <div
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                    role={"alert"}
                  >
                    <p className="font-bold">Hubo un error:</p>
                    <p className="">{formik.errors.confirm_password}</p>
                  </div>
                ) : null}
                <Link
                  to={"/auth/recovery"}
                  replace
                  className="text-right block text-blue-950 text-sm hover:text-blue-800"
                >
                  Ir a iniciar sesión
                </Link>
                <input
                  type={"submit"}
                  disabled={onProccess}
                  className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
                  value="Cambiar contraseña"
                />
              </form>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default RestorePasswordPage;
