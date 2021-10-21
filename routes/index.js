import React, { useContext } from "react";
import AuthContext from "../context/auth";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import ConsultorRoutes from "./consultor.routes";
import ProdutorRoutes from "./produtor.routes";
import DiretorRoutes from "./diretor.routes";
import ComercialRoutes from "./comercial.routes";

const Routes = () => {
  const { user, signed } = useContext(AuthContext);

  return user ? (
    user.tipo === "Consultor" ? (
      <ConsultorRoutes />
    ) : user.tipo === "Produtor" ? (
      <ProdutorRoutes />
    ) : user.tipo === "Diretor" ? (
      <DiretorRoutes />
    ) : user.tipo === "Comercial" ? (
      <ComercialRoutes />
    ) : null
  ) : (
    <AuthRoutes />
  );
};

export default Routes;
