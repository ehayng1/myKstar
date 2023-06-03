import React from "react";
import { RegisterForm } from "./components/RegisterForm";

export function Register() {
  return (
    <main>
      <h1>Welcome! </h1>
      <h2>Are you a new user? You can register you're self bellow!</h2>
      <hr />
      <RegisterForm />
    </main>
  );
}