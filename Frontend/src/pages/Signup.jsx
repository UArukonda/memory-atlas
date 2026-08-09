import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        action=""
        className="flex flex-col w-full max-w-md gap-4 rounded-2xl border border-border p-8 bg-surface shadow-sm"
      >
        <Input
          id="username"
          label="Username"
          type="text"
          name="username"
          placeholder="username"
        />
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
        <Button type="submit">Sign Up</Button>
        <p className="mt-5 text-center text-sm text-muted">
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
  );
};

export default Signup;
