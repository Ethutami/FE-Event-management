import * as Yup from "yup";

const VerifyResetSchema = Yup.object().shape({
  email: Yup.string().email("Wrong Format").required("Wajib diisi"),
});

export default VerifyResetSchema;
