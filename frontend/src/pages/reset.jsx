import { useState } from "react";
import AuthForm from "../components/auth/authForm";
import AuthLayout from "../components/layouts/Layout";
import { resetRequestSchema } from "../utils/zod";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = resetRequestSchema.safeParse({ email });
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
      });
      setIsLoading(false);
      return;
    }

    setErrors({});
    const data = {
      email,
    };
    try {
      const res = await fetch("https://bet-test-rv5o.onrender.com/api/auth/request-reset", {
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

      alert("Reset link  successfuly sent to your email! check your email");
    } catch (error) {
      alert(`Network error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        fields={[
          {
            name: "email",
            type: "email",
            label: "Email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            error: errors.email
          },
        ]}
        onSubmit={handleSubmit}
        buttonLabel="Reset"
        isLoading={isLoading}

      />
    </AuthLayout>
  );
};

export default Reset;
