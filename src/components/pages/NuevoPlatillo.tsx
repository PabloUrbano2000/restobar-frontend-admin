import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router";

// import FileUploader from "react-firebase-file-uploader";

const NuevoPlatillo = () => {
  // state para las imagenes
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlImagen, guardarUrlImagen] = useState("");

  // Context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  // Hook para redireccionar
  const navigate = useNavigate();

  // validacion y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      categoria: "",
      imagen: "",
      descripcion: "",
    },
    initialErrors: {
      nombre: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "Los Platillos deben tener almenos 3 caracteres")
        .required("El Nombre del platillo es obligotario"),
      precio: Yup.number()
        .min(1, "Debes agregar un número")
        .required("El Precio del platillo es obligotario"),
      categoria: Yup.string().required(
        "La Categoría del platillo es obligotaria"
      ),
      descripcion: Yup.string()
        .min(10, "La descripción debe ser más larga")
        .required("La descripción es obligatoria"),
    }),
    onSubmit: async (datos) => {
      try {
        // para subir la imagen en firebase
        // if (datos.imagen) {
        //   const resImagen = firebase.uploadFile(datos.imagen);

        //   const urlImagen = await resImagen.ref.getDownloadURL();
        //   if (urlImagen) {
        //     console.log("La ruta de la imagen es:", urlImagen);
        //   }
        // }

        const newData: any = { ...datos };

        // asignando la existencia del producto
        newData.existencia = true;

        // asignando la url de la imagen subida
        newData.imagen = urlImagen;

        // le mando la colección donde debe crearse y el cuerpo como objeto
        const resultBody = await firebase?.insertDocument("productos", {
          ...datos,
        });

        // en caso recibo un id quiere decir que se insertó
        if (resultBody.id) {
          console.log("insercción de cuerpo correcta:", resultBody.id);
          navigate("/menu", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Todo sobre las imagenes
  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const handleUploadError = (error: any) => {
    guardarSubiendo(false);
    console.log(error);
  };

  const handleUploadSuccess = async (nom: any) => {
    guardarProgreso(100);
    guardarSubiendo(false);

    // Almacenar la URL de destino
    const url = await firebase?.storage
      .ref("productos")
      .child(nom)
      .getDownloadURL();
    console.log(url);
    guardarUrlImagen(url);
  };

  const handleProgress = (prog: any) => {
    guardarProgreso(prog);
    console.log(prog);
  };

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                id="nombre"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nombre Platillo"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik?.errors?.nombre}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                id="precio"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="$20"
                min="0"
                value={formik.values.precio}
                onChange={formik.handleChange}
                step={"any"}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik.errors.precio}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categoria"
              >
                Categoría
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={""}>-- Seleccione --</option>
                <option value={"desayuno"}>Desayuno</option>
                <option value={"comida"}>Comida</option>
                <option value={"cena"}>Cena</option>
                <option value={"bebidas"}>Bebidas</option>
                <option value={"postre"}>Postre</option>
                <option value={"ensalada"}>Ensalada</option>
              </select>
            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik.errors.categoria}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imagen"
              >
                Imagen
              </label>
              {/* <input
                id="imagen"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                accept="image/*"
                value={formik.values.imagen}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              /> */}
              {/* <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("productos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              /> */}
            </div>

            {subiendo && (
              <div className="h-12 relative w-full border">
                <div
                  className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                  style={{ width: `${progreso}%` }}
                >
                  {progreso} %
                </div>
              </div>
            )}

            {urlImagen && (
              <p className="bg-green-500 text-white p-3 text-center my-5">
                La imagen se subió correctamente
              </p>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                placeholder="Descripción del Platillo"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role={"alert"}
              >
                <p className="font-bold">Hubo un error:</p>
                <p className="">{formik.errors.descripcion}</p>
              </div>
            ) : null}
            <input
              type={"submit"}
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
              value="Agregar Platillo"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoPlatillo;
