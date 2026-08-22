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
    <div className="flex min-h-screen bg-background">
      {/* {left side} */}
      <div className="flex w-2/5 items-center  px-12 justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md gap-2 rounded-2xl border border-border p-6 bg-surface shadow-sm"
        >
          <div className="mb-1">
            {/* <p className="text-sm font-medium text-primary">Memory Atlas</p> */}

            <h1 className="mt-2 text-xl font-bold text-heading">
              Create your account
            </h1>
          </div>
          {message && (
            <div className="fixed top-5 right-5 z-50 w-96 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-success)]/10">
                  <span className="text-lg text-[var(--color-success)]">✓</span>
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-[var(--color-heading)]">
                    Signup successful!
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {message}
                  </p>
                </div>
                <button
                  onClick={() => setMessage("")}
                  className="text-xl leading-none text-[var(--color-muted)] hover:text-[var(--color-heading)]"
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
              className="font-medium  text-primary hover:underline"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
      {/* {right side} */}
      <div className="border w-3/5 border-border bg-primary/5 p-12 ">
        {/* hero image */}
        <div className="mb-10 h-72 w-full max-w-2xl rounded-2xl bg-gray-200"></div>
        {/* Logo / Brand */}
        <h1 className="mb-3 text-4xl font-bold text-heading">Memory Atlas</h1>
        {/* Tagline */}
        <p className="mb-2 text-xl text-body">Every place has a story.</p>
        {/* Description */}
        <p className="mb-10 max-w-lg text-center text-muted">
          Create your own private map of memories, adventures, and moments worth
          revisiting.
        </p>
        {/* Feature placeholders */}
        {/* <div className="flex w-full max-w-xl gap-4">
          <div className="h-24 flex-1 rounded-xl bg-gray-200"></div>
          <div className="h-24 flex-1 rounded-xl bg-gray-200"></div>
          <div className="h-24 flex-1 rounded-xl bg-gray-200"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Signup;
