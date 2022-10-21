import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main";
import { PatientsProvider } from "./context/PatientsContext";
import { ToastsProvider } from "./context/ToastContext";

function App() {
  return (
    <PatientsProvider>
      <ToastsProvider>
        <Main />
      </ToastsProvider>
    </PatientsProvider>
  );
}

export default App;
