import { Col, Container, Row, Table } from "react-bootstrap";
import { Patient } from "../../classes/Patient";
import { usePatients } from "../../context/PatientsContext";
import Loading from "../Loading";
import PatientForm from "../Patient/Form";
import TableRow from "../Table/Row";

export default function Main() {
  const { isLoading, patients } = usePatients();

  return (
    <Container className="pt-4">
      <Row>
        <Col xs={12} lg={2}>
          <PatientForm patient={new Patient()} />
        </Col>
        <Col>
          {isLoading ? (
            <Loading />
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Source</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => {
                  return <TableRow key={patient.id} patient={patient} />;
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}
