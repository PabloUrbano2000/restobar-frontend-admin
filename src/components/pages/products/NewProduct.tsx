import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router";
import { Category } from "../../../types";
import { createProduct, getCategories } from "../../../services";
import { showFailToast, showSuccessToast } from "../../../utils/toast";
import { Link } from "react-router-dom";
import { productExtendRegex } from "../../../utils/regex";

const NewProduct = () => {
  // // Hook para redireccionar
  const navigate = useNavigate();

  const [inProcess, setInProcess] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadingCombo = async () => {
      try {
        const data = await getCategories();
        if (data.status_code == 200) {
          setCategories(data.docs);
        } else {
          showFailToast("Ocurrió un error al cargar los categorías");
        }
      } catch (error) {
        showFailToast("Ocurrió un error al cargar los categorías");
      }
    };
    loadingCombo();
  }, []);

  // validacion y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "El nombre debe tener entre 3 a 50 caracteres")
        .max(50, "El nombredebe tener entre 3 a 50 caracteres")
        .required("El nombre del producto es obligotario")
        .matches(productExtendRegex, "Formato de name inválido"),
      price: Yup.number()
        .min(1, "El precio debe entre 1 a 1000")
        .max(1000, "El precio debe entre 1 a 1000")
        .required("El precio del producto es obligotario"),
      category: Yup.string().required(
        "La categoría del producto es obligatoria"
      ),
      description: Yup.string()
        .min(10, "La descripción debe tener entre 10 a 100 caracteres")
        .max(100, "La descripción debe tener entre 10 a 100 caracteres")
        .required("La descripción del producto es obligatoria"),
    }),
    onSubmit: async (values) => {
      try {
        setInProcess(true);

        const data = await createProduct({
          name: values.name,
          price: Number(values.price),
          description: values.description,
          category: values.category,
        });

        if (data.status_code == 200) {
          showSuccessToast(data.message || "Producto registrado éxitosamente");
          navigate("/productos", {
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
      <div className="container flex px-4">
        <h1 className="font-bold text-3xl">Crear Producto</h1>
        <Link
          to={"/productos"}
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
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nombre producto"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik?.errors?.name}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Precio
              </label>
              <input
                id="price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="S/. 20"
                min="0"
                max="1000"
                value={formik.values.price}
                onChange={formik.handleChange}
                step={0.01}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik.errors.price}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Categoría
              </label>
              <select
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={""}>-- Seleccione --</option>
                {categories.length > 0
                  ? categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {formik.touched.category && formik.errors.category ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik.errors.category}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Descripción
              </label>
              <textarea
                id="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                placeholder="Descripción del producto"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik.errors.description}</p>
              </div>
            ) : null}
            <input
              type={"submit"}
              disabled={inProcess}
              className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
              value="Crear Producto"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
