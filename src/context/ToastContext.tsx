import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import ToastComponent from "../components/Toast";

type ToastProviderProps = {
  children: ReactNode;
};

type ToastContextType = {
  show: boolean
  setShow: (show: boolean) => void
  toast: string
  showToast: (message: string) => void
};

const ToastContext = createContext({} as ToastContextType);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastsProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<string>("");
  const [show, setShow] = useState(false)

  function showToast(message: string) {
    setShow(true)
    setToast(message)
  }

  return (
    <ToastContext.Provider
      value={{
        show,
        toast,
        setShow,
        showToast
      }}
    >
      <ToastComponent />
      {children}
    </ToastContext.Provider>
  );
}
