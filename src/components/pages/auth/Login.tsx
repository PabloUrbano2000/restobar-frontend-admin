import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router";
import { enviroments } from "../../../env";
import { DocumentResponse } from "../../../interfaces";
import { SystemUser } from "../../../types";
import { useAuthContext } from "../../../context/AuthContext";
import { setCookie } from "../../../utils/cookies";
import { COOKIE_REFRESH_TOKEN, COOKIE_TOKEN } from "../../../utils/constants";

const LoginPage = () => {
  const navigate = useNavigate();
  const { updateAuth } = useAuthContext();

  // validacion y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Formato de correo inválido")
        .required("El correo es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (datos) => {
      try {
        const result = await fetch(`${enviroments.API_URL}/admin/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: datos.email,
            password: datos.password,
          }),
        });

        const data: DocumentResponse<SystemUser> = await result.json();

        if (data.status_code == 200) {
          console.log(
            "resultado",
            data.data?.user,
            data.data?.access_token,
            data.data?.refresh_token
          );
          setCookie(COOKIE_TOKEN, data.data?.access_token || "");
          setCookie(COOKIE_REFRESH_TOKEN, data.data?.refresh_token || "");

          updateAuth({ user: data.data?.user });
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Inicio de sesión</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-2xl">
          <form onSubmit={formik.handleSubmit}>
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

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
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

            <input
              type={"submit"}
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
              value="Iniciar Sesión"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
