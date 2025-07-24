import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../components/layouts/Layout";
import AuthForm from "../components/auth/authForm";
import { resetSchema } from "../utils/zod";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors,setErrors] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = resetSchema.safeParse({ newPassword });
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        newPassword: formattedErrors.newPassword?._errors[0],
      });
      setIsLoading(false);
      return;
    }

    setErrors({});

    try {
      const res = await fetch("https://bet-test-rv5o.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) return <p>Invalid or missing token.</p>;

  return (
    <AuthLayout>
      <AuthForm
        fields={[
          {
            name: "newPassword",
            type: "password",
            label: "New Password",
            value: newPassword,
            onChange: (e) => setNewPassword(e.target.value),
            required: true,
            error: errors.newPassword
          },
        ]}
        onSubmit={handleSubmit}
        buttonLabel="Set New Password"
        isLoading={isLoading}
      />
    </AuthLayout>
  );
};

export default ResetPassword;
