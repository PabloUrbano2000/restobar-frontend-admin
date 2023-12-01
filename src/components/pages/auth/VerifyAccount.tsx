import React from "react";

import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { verifyAccountToken } from "../../../services";

const VerifyAccountPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [isValidToken, setIsValidToken] = React.useState(false);

  React.useEffect(() => {
    const verifyPassToken = async () => {
      const token = searchParams.get("token");

      if (token) {
        const data = await verifyAccountToken(token);
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

  return (
    <>
      <div
        className="flex justify-center w-11/12 rounded flex-col bg-slate-100 md:w-6/12 shadow-lg p-5 my-5"
        style={{
          maxWidth: "500px",
          minHeight: "200px",
        }}
      >
        {loading ? <Spinner /> : null}
        {!loading && !isValidToken ? (
          <div>
            <h2 className="text-3xl mb-4 text-center font-semibold uppercase my-2">
              Su token ha expirado, por favor vuelva a solicitarla
            </h2>
            <Link
              to={"/auth/login"}
              replace
              className="text-center mx-auto block text-blue-950 text-sm hover:text-blue-800"
            >
              Ir a iniciar sesión
            </Link>
          </div>
        ) : null}

        {!loading && isValidToken ? (
          <>
            <div>
              <h2 className="text-3xl mb-4 text-center font-semibold uppercase my-2">
                Su cuenta fue verificada éxitosamente, por favor de clic en
                iniciar sesión para comenzar
              </h2>
              <Link
                to={"/auth/login"}
                replace
                className="text-center mx-auto block text-blue-950 text-sm hover:text-blue-800"
              >
                Ir a iniciar sesión
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default VerifyAccountPage;
