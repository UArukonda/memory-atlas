import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/auth";
import { validateLogin } from "../utils/validateSignup";
import { useAuth } from "../context/useAuth.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <div className="flex w-full items-center min-h-screen  px-12 justify-center bg-primary/20">
      <form
        action=""
        className="flex flex-col w-full max-w-md gap-2 rounded-2xl border border-border p-6 bg-surface shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <p className="text-lg font-medium text-primary">Memory Atlas</p>
          <h1 className="mt-2 text-xl font-bold text-heading">Login</h1>
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
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit">Login</Button>
        <p className="mt-3 text-center text-sm text-muted">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium  text-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
