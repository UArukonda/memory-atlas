import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/auth";
import { validateLogin } from "../utils/validateSignup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateLogin({ email, password });
    if (err) {
      setError(err);
    }

    try {
      const response = await loginUser({ email, password });
      console.log(response);
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      setError(err.response.data.message);
    }
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex w-3/5 flex-col items-center justify-center bg-primary/5 p-12 ">
        <div className="mb-10 h-72 w-full max-w-2xl rounded-2xl bg-gray-200"></div>

        <h1 className="mb-3 text-4xl font-bold text-heading">Welcome Back</h1>

        <p className="mb-2 text-xl text-body">Continue your journey.</p>

        <p className="mb-10 max-w-lg text-center text-muted">
          Revisit your favorite places, relive unforgettable moments, and keep
          building your personal Memory Atlas.
        </p>

        <div className="flex w-full max-w-xl gap-4">
          <div className="h-24 flex-1 rounded-xl bg-gray-200"></div>
          <div className="h-24 flex-1 rounded-xl bg-gray-200"></div>
          <div className="h-24 flex-1 rounded-xl bg-gray-200"></div>
        </div>
      </div>
      <div className="flex w-2/5 items-center  px-12 justify-center">
        <form
          action=""
          className="flex flex-col w-full max-w-md gap-2 rounded-2xl border border-border p-6 bg-surface shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
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
    </div>
  );
};

export default Login;
