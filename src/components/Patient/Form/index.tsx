import { Button, Form, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import clsx from "clsx";
import { patientSchema } from "../../../classes/Patient/schema";
import { usePatients } from "../../../context/PatientsContext";
import { useToast } from "../../../context/ToastContext";

export default function PatientForm({ patient }: any) {
  const { addPatient, editPatient, updatePatient } = usePatients();
  const { id, first_name, last_name } = editPatient || patient;
  const { showToast } = useToast();
  const isEditing = editPatient != null


  function editPatientSubmit(setSubmitting: any, values: any) {
    setSubmitting(true);
    fetch(
      `https://z9b896e9c-z20013b02-gtw.z730c2fa2.jvm.world/patients/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patient: { ...values, source: "react" } }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        updatePatient(res.id, res);
        showToast("Patient updated successfully");
      });
    setSubmitting(false);
  }

  function addPatientSubmit(setSubmitting: any, values: any) {
    setSubmitting(true);
    fetch("https://z9b896e9c-z20013b02-gtw.z730c2fa2.jvm.world/patients", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patient: { ...values, source: "react" } }),
    })
      .then((res) => res.json())
      .then((res) => {
        addPatient(res);
        showToast("Patient added successfully");
      });
    setSubmitting(false);
  }

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          first_name: first_name,
          last_name: last_name,
        }}
        validationSchema={patientSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          id === null
            ? addPatientSubmit(setSubmitting, values)
            : editPatientSubmit(setSubmitting, values);

            resetForm()
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          dirty,
          isValid,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            {isEditing ? (
             <h2>Editing patient: #{editPatient?.id}</h2>
            ) : (
             <h2>Adding patient</h2>
            )}
            <Form.Group className="mb-3" controlId="first_name">
              <Form.Label>First name</Form.Label>
              <Form.Control
                className={clsx({
                  ["is-valid"]: !errors.first_name && touched.first_name,
                  ["is-invalid"]: errors.first_name && touched.first_name,
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                name="first_name"
                type="text"
                value={values.first_name}
                placeholder="Enter first name"
              />
              <div className="valid-feedback">Looks good!</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="last_name">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                className={clsx({
                  ["is-valid"]: !errors.last_name && touched.last_name,
                  ["is-invalid"]: errors.last_name && touched.last_name,
                })}
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                type="text"
                placeholder="Enter last name"
              />
              <div className="valid-feedback">Looks good!</div>
            </Form.Group>
            <Button
              disabled={isSubmitting || !isValid || !dirty}
              variant="primary"
              type="submit"
            >
              {isSubmitting && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              <span className="visually-hidden">Loading...</span>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
