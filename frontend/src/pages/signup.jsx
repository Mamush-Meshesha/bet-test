import { useState } from "react";
import AuthForm from "../components/auth/authForm";
import AuthLayout from "../components/layouts/Layout";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../utils/zod";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = signupSchema.safeParse({ email, password ,confirmPassword,phone});
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
        confirmPassword: formattedErrors.confirmPassword?._errors?.[0] || "",
        phone: formattedErrors.phone?._errors?.[0] || "",
      });
      setIsLoading(false);
      return;
    }

    setErrors({});
    try {
      const data = {
        email,
        phone,
        password,
      };
      const res = await fetch("https://bet-test-rv5o.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Registration failed: ${errorData.message || res.statusText}`);
        return;
      }

      const result = await res.json();
      alert("Registration successful!", result);
      navigate("/");
    } catch (error) {
      alert(`Network error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AuthLayout>
        <AuthForm
          fields={[
            {
              name: "email",
              label: "Email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              error: errors.email,
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              error: errors.password,
            },
            {
              name: "confirm_pass",
              label: "Confirm Password",
              type: "password",
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              required: true,
              error: errors.confirmPassword,
            },
            {
              name: "phone",
              label: "Phone Number",
              type: "tel",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              required: true,
              error: errors.phone,
            },
          ]}
          onSubmit={handleSubmit}
          buttonLabel="Signup"
          isLoading={isLoading}
           extraLinks={[
            { to: "/login", label: "Already have an account? Signin" },
          ]}
        />
      </AuthLayout>
    </>
  );
};

export default Signup;
