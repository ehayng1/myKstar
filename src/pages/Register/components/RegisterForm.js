import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../utils/Firebase/Users/users.firebase";

export function RegisterForm() {
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await registerUser(values);
      alert("Registration successful. Please login.")
      navigate("/login")
    } catch (error) {
      setError(error.message);
    }
  };

  const backToLogin = () => navigate("/login");

  return (
    <div>
      <form>
        <label>
          First Name:
          <input type="text" name="firstName" value={values.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={values.lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={values.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={values.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSignUp}>Sign Up</button>
        <button type="button" onClick={backToLogin}>Back to Login</button>
      </form>
      {error && <code>{error}</code>}
    </div>
  );
}
