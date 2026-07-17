import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes.tsx";
import { ScrollReveal } from "./components/common/ScrollReveal";
import { ScrollTop } from "./components/common/ScrollTop";
import { WhatsAppFAB } from "./components/common/WhatsAppFAB";

function App() {
  return (
    <>
      <ScrollReveal />
      <ScrollTop />
      <AppRoutes />
      <WhatsAppFAB />
      <ToastContainer />
    </>
  );
}

export default App;
