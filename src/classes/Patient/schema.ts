import { object, string } from 'yup';

export const patientSchema = object({
  first_name: string().required("First name is a required field").min(2, "Should be longer than one"),
  last_name: string().required("Last name is a required field")
});
