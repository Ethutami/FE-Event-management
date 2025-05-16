import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
  new_password: Yup.string().required("Wajib diisi"),
  confirm_password: Yup.string().required("Wajib diisi"),
});

export default ResetPasswordSchema;
