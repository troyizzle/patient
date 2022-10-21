import { Button } from "react-bootstrap";
import { Patient } from "../../../classes/Patient";
import { usePatients } from "../../../context/PatientsContext";
import { useToast } from "../../../context/ToastContext";

type TableRowProps = {
  patient: Patient;
}

export default function TableRow({ patient }: TableRowProps) {
  const { id, first_name, last_name } = patient;
  const { showToast } = useToast()
  const { removePatient, setEditPatient } = usePatients()

  function handleDestroyClick(patient: Patient) {
    if (window.confirm(`Are you sure you want to delete ${patient.first_name} ${patient.last_name}?`)) {
          fetch(
            `https://z9b896e9c-z20013b02-gtw.z730c2fa2.jvm.world/patients/${id}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              }
            }
          )
            .then((_res) => {
              removePatient(patient.id)
              showToast("Patient removed!")
              })
    }
  }

  function handleEdit(_event: any) {
    setEditPatient(patient)
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>
        <div className="actions">
          <Button onClick={() => handleDestroyClick(patient)} variant="danger">
          Delete
          </Button>
          <Button
          className="ms-2"
          onClick={handleEdit} variant="success">
            Edit
          </Button>
        </div>
      </td>
    </tr>
  );
}
