import * as yup from "yup";

export const patientSchema = yup.object().shape({
  surname: yup.string().required("Please enter the patient's last name"),
  other_names: yup.string().required("Please enter the patient's first name and other names"),
  date_of_birth: yup.string().required("Please enter the patient's date of birth")
});

export const patientNOKSchema = yup.object().shape({
  nok_surname: yup.string().required("Please enter the next of kin's last name"),
  nok_other_names: yup.string().required("Please enter the nex of kin's first name and other names"),
});
