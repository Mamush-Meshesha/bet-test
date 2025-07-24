import { useState } from "react";
import Button from "../ui/button";
import { Link } from "react-router-dom";

const AuthForm = ({ fields, onSubmit, buttonLabel, isLoading, extraLinks }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      {fields?.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <label className="justify-start flex">{field.label}</label>
          <input
            className="h-11 w-full text-black px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            type={field.type}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
          />
          {field.error && (
            <span className="text-red-500 text-sm">{field.error}</span>
          )}
        </div>
      ))}

      <div className="flex items-center gap-2">
        <input
          id="terms"
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="terms" className="flex items-center text-sm pt-1.5">
          Terms and Conditions
        </label>
      </div>

      <div>
        <Button
          type="submit"
          onSubmit={onSubmit}
          disabled={!acceptedTerms}
          className={`${!acceptedTerms ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Proccessing..." : buttonLabel}
        </Button>
      </div>
      {extraLinks && (
        <div className="flex justify-between text-sm mt-4">
          {extraLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="text-[#fff] hover:underline">
              {label}
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default AuthForm;
