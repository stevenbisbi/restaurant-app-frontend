import { Routes, Route } from "react-router-dom";
import { RegisterFormPage } from "../layouts/client/forms/RegisterFormPage";
import { HomePage } from "../layouts/client/pages/HomePage";
import { LoginFormPage } from "../auth/LoginFormPage";
import NotFound from "../common/Nofound";
import ClientLayout from "../layouts/client/ClientLayout";
import { ReservarPage } from "../layouts/client/pages/ReservarPage";
import { SalchipapaPage } from "../layouts/client/pages/SalchipapaPage";
import { HamburguesaPage } from "../layouts/client/pages/HamburguesaPage";
import { EmparedadosPage } from "../layouts/client/pages/EmparedadosPage";
import { PerrosPage } from "../layouts/client/pages/PerrosPage";
import { BebidasPage } from "../layouts/client/pages/BebidasPage";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterFormPage />} />
      <Route path="/login" element={<LoginFormPage />} />
      <Route path="/" element={<HomePage />} />
      <Route element={<ClientLayout />}>
        <Route path="/reservar" element={<ReservarPage />} />
        <Route path="/salchipapa" element={<SalchipapaPage />} />
        <Route path="/hamburguesa" element={<HamburguesaPage />} />
        <Route path="/emparedados" element={<EmparedadosPage />} />
        <Route path="/perros" element={<PerrosPage />} />
        <Route path="/bebidas" element={<BebidasPage />} />
      </Route>
      <Route path="*" element={<NotFound />} /> {/* Este va fuera del layout */}
    </Routes>
  );
};

export default ClientRoutes;
