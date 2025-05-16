import * as Yup from "yup";

const EditProfileSchema = Yup.object().shape({
  first_name: Yup.string().required("Wajib diisi"),
  last_name: Yup.string().required("Wajib diisi"),
  email: Yup.string().email("Format email salah").required("Wajib diisi")
});

export default EditProfileSchema;
