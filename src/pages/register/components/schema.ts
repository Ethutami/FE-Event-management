import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Format email salah").required("Wajib diisi"),
  first_name: Yup.string()
    .min(3, "minimal 3 character")
    .required("Wajib diisi"),
  last_name: Yup.string().required("Wajib diisi"),
  role: Yup.string().required("Please pick your role"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Minimum eight characters, at least one letter, one number and one special character"
    )
    .required("Wajib diisi"),
});

export default RegisterSchema;
