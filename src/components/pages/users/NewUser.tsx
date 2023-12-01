import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router";
import { namesRegex } from "../../../utils/regex";
import { Role } from "../../../types";
import { PaginateResponse } from "../../../interfaces";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { createUser, getRoles } from "../../../services";

const NewUserPage = () => {
  // Hook para redireccionar
  const navigate = useNavigate();
  const [onProccess, setOnProccess] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const loadingCombo = async () => {
      try {
        const data: PaginateResponse<Role> = await getRoles();
        if (data.status_code == 200) {
          setRoles(data.docs);
        } else {
          toast.error("Ocurrió un error al cargar los roles", {
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        toast.error("Ocurrió un error al cargar los roles", {
          position: "top-right",
          duration: 3000,
        });
      }
    };
    loadingCombo();
  }, []);

  // validacion y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      role: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, "El nombre debe tener entre 2 a 50 caracteres")
        .max(50, "El nombre debe tener entre 2 a 50 caracteres")
        .required("El nombre del usuario es obligotario")
        .matches(namesRegex, "Formato de nombre inválido"),
      last_name: Yup.string()
        .min(2, "El apellido paterno debe tener entre 2 a 50 caracteres")
        .max(50, "El apellido paterno debe tener entre 2 a 50 caracteres")
        .required("El apellido paterno es obligotario")
        .matches(namesRegex, "Formato de apellido paterno inválido"),
      email: Yup.string()
        .required("El correo electrónico es obligatorio")
        .email("Formato de correo electrónico inválido"),
      role: Yup.string().required("El Rol del usuario es obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        setOnProccess(true);

        const data = await createUser({
          email: values.email.toLowerCase(),
          first_name: values.first_name,
          last_name: values.last_name,
          role: values.role,
        });

        if (data.status_code == 200) {
          toast.success(data.message || "Usuario registrado éxitosamente", {
            position: "top-right",
            duration: 3000,
          });
          navigate("/usuarios", {
            replace: true,
          });
        } else {
          toast.error(data.errors[0], {
            position: "top-right",
            duration: 3000,
          });
        }
      } catch (error) {
        console.log(error);
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
      <div className="container flex px-4">
        <h1 className="font-bold text-3xl">Crear Usuario</h1>
        <Link
          to={"/usuarios"}
          replace
          className="ml-auto rounded bg-slate-900 py-2 px-4 text-lg text-white text-normal font-bold"
        >
          Volver
        </Link>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="first_name"
              >
                Nombre
              </label>
              <input
                id="first_name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nombre usuario"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.first_name && formik.errors.first_name ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik?.errors?.first_name}</p>
              </div>
            ) : null}

            <div className="mb-4">
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
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.last_name && formik.errors.last_name ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik?.errors?.last_name}</p>
              </div>
            ) : null}

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
                type="text"
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
                htmlFor="role"
              >
                Rol
              </label>
              <select
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={""}>-- Seleccione --</option>

                {roles.length > 0
                  ? roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.alias}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {formik.touched.role && formik.errors.role ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik.errors.role}</p>
              </div>
            ) : null}

            <input
              type={"submit"}
              disabled={onProccess}
              className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
              value="Crear Usuario"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUserPage;
