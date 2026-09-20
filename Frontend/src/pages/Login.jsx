import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser, sendResetLink } from "../services/auth";
import { validateLogin } from "../utils/validateSignup";
import { useAuth } from "../context/useAuth.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);
  const { reFetchUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateLogin({ email, password });
    if (err) {
      setError(err);
      return;
    }

    try {
      await loginUser({ email, password });
      setEmail("");
      setPassword("");
      setError("");
      await reFetchUser();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const handleReset = async () => {
    try {
      await sendResetLink(email);
      setEmail("");
      setIsResetLinkSent(!isResetLinkSent);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-atlas px-6 sm:px-12">
      <form
        action=""
        className="panel flex w-full max-w-md flex-col gap-2 rounded-2xl border border-t-2 border-border border-t-primary/60 p-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <p className="eyebrow">Memory Atlas</p>
          <h1 className="mt-2 font-display text-3xl font-medium text-heading">
            Login
          </h1>
        </div>
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
        <p className="text-right text-sm">
          <button
            type="button"
            onClick={() => setIsForgotPasswordOpen(true)}
            className="font-medium text-primary hover:underline"
          >
            Forgot password?
          </button>
        </p>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit">Login</Button>
        <p className="mt-3 text-center text-sm text-muted">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-2xl">
            {isResetLinkSent ? (
              <>
                <h2 className="font-display text-2xl font-medium text-heading">
                  Check your email
                </h2>
                <p className="mt-2 text-sm text-muted">
                  If an account exists for that email, we've sent a link to
                  reset your password.
                </p>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPasswordOpen(false);
                      setIsResetLinkSent(false);
                    }}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-ink transition hover:bg-primary-hover"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-display text-2xl font-medium text-heading">
                  Reset your password
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Enter your email and we'll send you a link to reset your
                  password.
                </p>
                <div className="mt-4">
                  <Input
                    id="reset-email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name="reset-email"
                    placeholder="email"
                  />
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPasswordOpen(false);
                    }}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-ink transition hover:bg-primary-hover"
                  >
                    Send reset link
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
