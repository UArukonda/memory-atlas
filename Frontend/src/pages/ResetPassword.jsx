import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../services/auth";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleReset = async () => {
    try {
      await resetPassword({ token, newPassword });
      setNewPassword("");
      setConfirmNewPassword("");
      setIsResetSuccessful(!isResetSuccessful);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div>
      {!isResetSuccessful ? (
        <div className="flex w-full items-center min-h-screen px-12 justify-center bg-primary/20">
          <div className="flex flex-col w-full max-w-md gap-2 rounded-2xl border border-border p-6 bg-surface shadow-sm">
            <div className="mb-1">
              <p className="text-lg font-medium text-primary">Memory Atlas</p>
              <h1 className="mt-2 text-xl font-bold text-heading">
                Reset your password
              </h1>
            </div>
            <Input
              id="new-password"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              name="new-password"
              placeholder="new password"
            />
            <Input
              id="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
              }}
              name="confirm-password"
              placeholder="confirm new password"
            />
            <Button type="submit" onClick={handleReset}>
              Save new password
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center min-h-screen px-12 justify-center bg-primary/20">
          <div className="flex flex-col w-full max-w-md gap-2 rounded-2xl border border-border p-6 bg-surface shadow-sm">
            <div className="mb-1">
              <p className="text-lg font-medium text-primary">Memory Atlas</p>
              <h1 className="mt-2 text-xl font-bold text-heading">
                Password updated
              </h1>
            </div>
            <p className="text-sm text-muted">
              Your password has been reset successfully. You can now log in with
              your new password.
            </p>
            <Link
              to="/login"
              onClick={() => {
                setIsResetSuccessful(!isResetSuccessful);
              }}
              className="mt-3 text-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
