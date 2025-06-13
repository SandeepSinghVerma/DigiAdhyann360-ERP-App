
export default function LoginValidation(values) {
  const errors = {};

  if (!values.email || values.email.trim() === "") {
    errors.email = "Email or Username is required";
  }

  if (!values.password || values.password.trim() === "") {
    errors.password = "Password is required";
  }

  return errors;
}
