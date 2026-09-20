import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { validateSignup } from "../utils/validateSignup";
import { registerUser } from "../services/auth.js";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validateSignup({ username, email, password, confirmPassword });
    if (err) {
      setError(err);
      return;
    }

    try {
      const response = await registerUser({ username, email, password });
      setMessage(response.data.message);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-atlas px-6 sm:px-12">
      <form
        onSubmit={handleSubmit}
        className="panel flex w-full max-w-md flex-col gap-2 rounded-2xl border border-t-2 border-border border-t-primary/60 p-8"
      >
        <div className="mb-1">
          <p className="eyebrow">Memory Atlas</p>

          <h1 className="mt-2 font-display text-3xl font-medium text-heading">
            Create your account
          </h1>
        </div>
        {message && (
          <div className="fixed right-5 top-5 z-50 w-96 rounded-xl border border-border bg-raised p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/15">
                <span className="text-lg text-success">✓</span>
              </div>

              <div className="flex-1">
                <p className="font-semibold text-heading">Signup successful!</p>
                <p className="mt-1 text-sm text-muted">{message}</p>
              </div>
              <button
                onClick={() => setMessage("")}
                className="text-xl leading-none text-muted hover:text-heading"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <Input
          id="username"
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="username"
        />
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Input
          id="confirm-password"
          label="Confirm Password"
          type="password"
          name="confirm-password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit">Sign Up</Button>
        <p className="mt-3 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
