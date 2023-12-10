import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import { FirebaseContext } from "../../../firebase";
import ProductItem from "./Product";
import { Product } from "../../../types";
import Spinner from "../../ui/Spinner";
import { generateLastPath } from "../../../utils/session";
import {
  availableProduct,
  disableProduct,
  enableProduct,
  getProducts,
  unavailableProduct,
} from "../../../services";
import AlertModal from "../../ui/AlertModal";
import { showFailToast, showSuccessToast } from "../../../utils/toast";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [productSelected, setProductSelected] = useState<Product | null>(null);

  const [error, setError] = useState<string>("");

  const [modalAvaibility, setModalAvaibility] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [inProcess, setInProcess] = useState(false);

  useEffect(() => {
    generateLastPath();

    const getAll = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        if (data.status_code === 200) {
          setProducts(data.docs);
        } else {
          setError(data.errors[0] || "Ocurrió un error desconocido");
        }
      } catch (error) {
        setError("Ocurrió un error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    getAll();
  }, []);

  const handleConfirmState = (product: Product) => {
    setProductSelected(product);
    setModalState(true);
  };

  const handleChangeState = async () => {
    try {
      setInProcess(true);
      if (productSelected) {
        const data =
          productSelected.status == 1
            ? await disableProduct(productSelected.id || "")
            : await enableProduct(productSelected.id || "");
        if (data.status_code === 200) {
          showSuccessToast(data?.message || "");
          setProducts(
            products.map((pro) =>
              pro.id === data.data?.product?.id
                ? { ...pro, status: data.data?.product?.status }
                : pro
            )
          );
        } else {
          showFailToast(data?.errors[0] || "");
        }
      }
    } catch (error) {
      showFailToast("Ocurrió un error desconocido");
    } finally {
      setInProcess(false);
      setModalState(false);
    }
  };

  const handleConfirmAvaibility = (product: Product) => {
    setProductSelected(product);
    setModalAvaibility(true);
  };

  const handleChangeAvaibility = async () => {
    try {
      setInProcess(true);
      if (productSelected) {
        const data =
          productSelected.available == 1
            ? await unavailableProduct(productSelected.id || "")
            : await availableProduct(productSelected.id || "");
        if (data.status_code === 200) {
          showSuccessToast(data?.message || "");
          setProducts(
            products.map((pro) =>
              pro.id === data.data?.product?.id
                ? { ...pro, available: data.data?.product?.available }
                : pro
            )
          );
        } else {
          showFailToast(data?.errors[0] || "");
        }
      }
    } catch (error) {
      showFailToast("Ocurrió un error desconocido");
    } finally {
      setInProcess(false);
      setModalAvaibility(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row container px-4 mx-auto">
        <h1 className="text-center md:text-left font-bold text-lg">
          Productos
        </h1>
        <Link
          to={"/productos/nuevo"}
          replace
          className="w-full md:w-auto text-center ml-auto rounded bg-slate-900 py-2 px-4 text-lg text-white text-normal font-bold"
        >
          Crear producto
        </Link>
      </div>

      <div className="flex w-full flex-wrap">
        {isLoading && <Spinner />}
        {error ? <p>{error}</p> : null}
        {!isLoading && products.length > 0
          ? products.map((pro: Product) => (
              <ProductItem
                key={pro.id}
                product={pro}
                onConfirmAvaibility={handleConfirmAvaibility}
                onConfirmState={handleConfirmState}
              />
            ))
          : null}
      </div>
      <AlertModal
        showModal={modalAvaibility}
        offModal={() => setModalAvaibility(false)}
        onModal={() => setModalAvaibility(true)}
        title={
          productSelected?.available === 1
            ? "Disponibilizar Producto"
            : "Indisponibilizar Producto"
        }
        closeButton="Cerrar"
        successButton="Confirmar"
        onSuccess={handleChangeAvaibility}
        isWarning={productSelected?.available === 1}
        description={
          productSelected?.available === 1
            ? "Al poner indisponible el producto este no podrá ser pedido por los clientes"
            : "Al poner disponible el producto este podrá ser pedido por los clientes"
        }
        disableButton={inProcess}
      ></AlertModal>
      <AlertModal
        showModal={modalState}
        offModal={() => setModalState(false)}
        onModal={() => setModalState(true)}
        title={
          productSelected?.status === 1
            ? "Inhabilitar Producto"
            : "Habilitar Producto"
        }
        closeButton="Cerrar"
        successButton="Confirmar"
        onSuccess={handleChangeState}
        isWarning={productSelected?.status === 1}
        description={
          productSelected?.status === 1
            ? "Al inhabilitar el producto este no podrá ser visible para los clientes"
            : "Al habilitar el producto este será visible para los clientes"
        }
        disableButton={inProcess}
      ></AlertModal>
    </>
  );
};

export default ProductsPage;
