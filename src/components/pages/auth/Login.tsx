import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router";
import { DocumentResponse } from "../../../interfaces";
import { SystemUser } from "../../../types";
import { useAuthContext } from "../../../context/AuthContext";
import { setCookie } from "../../../utils/cookies";
import { COOKIE_REFRESH_TOKEN, COOKIE_TOKEN } from "../../../utils/constants";
import { Link } from "react-router-dom";
import { loginSystemUser, recoveryAccount } from "../../../services";
import { showFailToast, showSuccessToast } from "../../../utils/toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { updateAuth } = useAuthContext();
  const [inProcess, setInProcess] = React.useState(false);
  const [showVerify, setShowVerify] = React.useState(false);
  const [email, setEmail] = React.useState("");

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
    onSubmit: async (values) => {
      try {
        setInProcess(true);
        setShowVerify(false);
        setEmail(values.email);
        const data = await loginSystemUser({
          email: values.email,
          password: values.password,
        });

        if (data.status_code == 200) {
          showSuccessToast("Inicio de sesión éxitoso");

          setCookie(COOKIE_TOKEN, data.data?.access_token || "");
          setCookie(COOKIE_REFRESH_TOKEN, data.data?.refresh_token || "");

          updateAuth({ user: data.data?.user });
          navigate("/", { replace: true });
        } else {
          if (data.error_code == "USER_NOT_VERIFIED") {
            showFailToast(data?.errors[0]);
            setShowVerify(true);
          } else {
            showFailToast(data?.errors[0]);
          }
        }
      } catch (error) {
        showFailToast("Ocurrió un error desconocido");
      } finally {
        setInProcess(false);
      }
    },
  });

  const sendVerifyAccount = async () => {
    try {
      setShowVerify(false);
      setInProcess(true);

      const data: DocumentResponse<SystemUser> = await recoveryAccount({
        email,
      });

      if (data.status_code == 200) {
        console.log("resultado", data);
        showSuccessToast(data.message || "");
      } else {
        showFailToast(data?.errors[0] || "");
      }
    } catch (error) {
      showFailToast("Ocurrió un error desconocido");
    } finally {
      setInProcess(false);
    }
  };

  return (
    <>
      <div
        className="flex justify-center w-11/12 rounded flex-col bg-slate-100 md:w-6/12 p-5 my-5"
        style={{
          maxWidth: "500px",
        }}
      >
        <h1 className="text-3xl mb-4 text-center font-semibold uppercase my-2">
          Inicio de sesión
        </h1>
        {showVerify ? (
          <div
            className="bg-yellow-200 border-l-4 border-yellow-100 text-yellow-400 p-2 mb-3"
            role={"warn"}
          >
            <p className="text-sm w-full inline-block">
              Envia el correo de verificación a{" "}
              <span className="font-bold">{email}</span> haciendo clic{" "}
              <button
                className="underline inline font-bold"
                onClick={sendVerifyAccount}
              >
                aquí
              </button>
            </p>
          </div>
        ) : null}
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
            <div className="flex flex-col">
              <Link
                to={"/auth/recovery"}
                className="ml-auto text-blue-950 text-sm hover:text-blue-800"
              >
                ¿Olvidé mi contraseña?
              </Link>
            </div>
            <input
              type={"submit"}
              disabled={inProcess}
              className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
              value="Iniciar Sesión"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
