import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWindowSize } from "react-use";
import { Patient } from "../classes/Patient";
import Confetti from "react-confetti";

type PatientsProviderProps = {
  children: ReactNode;
};

type PatientsContextType = {
  patients: Patient[];
  setPatients: any;
  isLoading: boolean;
  removePatient: (id: any) => void;
  addPatient: (patient: Patient) => void;
  editPatient: Patient | null;
  setEditPatient: (patient: Patient) => void;
  updatePatient: (id: number, patient: Patient) => void;
};

const PatientsContext = createContext({} as PatientsContextType);

export function usePatients() {
  return useContext(PatientsContext);
}

export function PatientsProvider({ children }: PatientsProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [runConfetti, setRunConfetti] = useState(false);

  function removePatient(id: number) {
    setPatients((currPatients: Patient[]) => {
      return currPatients.filter((t) => t.id !== id);
    });
  }

  function updatePatient(id: number, patient: Patient) {
    setPatients((currentPatients: Patient[]) => {
      return currentPatients.map((p) => {
        if (p.id === id) {
          return { ...patient };
        } else {
          return p;
        }
      });
    });
  }

  function addPatient(patient: Patient) {
    setPatients((currentPatients) => [patient, ...currentPatients]);
    setRunConfetti(true);
  }

  useEffect(() => {
    fetch("https://z9b896e9c-z20013b02-gtw.z730c2fa2.jvm.world/patients", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    setIsLoading(false);
  }, []);

  function stopConfetti() {
    setRunConfetti(false);
  }

  const { width, height } = useWindowSize();

  return (
    <PatientsContext.Provider
      value={{
        patients,
        setPatients,
        isLoading,
        removePatient,
        addPatient,
        editPatient,
        setEditPatient,
        updatePatient,
      }}
    >
      <div>
        <Confetti
          width={width}
          height={height}
          run={runConfetti}
          numberOfPieces={100}
          recycle={false}
          onConfettiComplete={stopConfetti}
        />
      </div>
      {children}
    </PatientsContext.Provider>
  );
}
