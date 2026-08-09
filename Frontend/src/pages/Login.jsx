import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        action=""
        className="flex flex-col w-full max-w-md gap-4 rounded-2xl border border-border p-8 bg-surface shadow-sm"
      >
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          placeholder="email"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          placeholder="password"
        />
        <Button type="submit">Login</Button>
        <p className="mt-5 text-center text-sm text-muted">
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
