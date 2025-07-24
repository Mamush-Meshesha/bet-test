import { useState } from "react";
import AuthForm from "../components/auth/authForm";
import AuthLayout from "../components/layouts/Layout";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../utils/zod";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
      setIsLoading(false);
      return;
    }

    setErrors({});

    try {
      const data = {
        email,
        password,
      };
      const res = await fetch(
        "https://bet-test-rv5o.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        alert(`Registration failed`);
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
    <div>
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
              type: "Password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              error: errors.password,
            },
          ]}
          onSubmit={handleSubmit}
          buttonLabel="Login"
          isLoading={isLoading}
          extraLinks={[
            { to: "/reset", label: "Forgot Password?" },
            { to: "/register", label: "Don't have an account? Sign Up" },
          ]}
        />
      </AuthLayout>
    </div>
  );
};

export default Login;
