import Input from "../components/Input";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { createProfile, updateProfile } from "../services/profile";
import { deleteUser } from "../services/user";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user, setUser, reFetchUser } = useAuth();
  const navigate = useNavigate();

  const handleSave = async () => {
    const hasProfile = Object.keys(user?.profile || {}).length > 0;

    if (hasProfile) await updateProfile({ displayName, bio });
    else await createProfile({ displayName, bio });

    await reFetchUser();
    setIsEditing(false);
  };

  const handleCancel = async () => {
    await reFetchUser();
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    setDisplayName(user?.profile?.displayName || "");
    setBio(user?.profile?.bio || "");
  }, [user]);

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-heading">Profile</h1>
          <p className="mt-1 text-sm text-muted">
            Manage your profile information
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-8 flex items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-gray-100">
              <img
                src={user?.profile?.avatar}
                alt={user?.profile?.avatar}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-heading">Profile photo</p>
              <p className="mt-1 text-sm text-muted">
                Choose a photo to represent you.
              </p>

              <button
                type="button"
                disabled={!isEditing}
                className="mt-3 rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-gray-50"
              >
                Upload photo
              </button>
            </div>
          </div>

          <div>
            <Input
              label="Display Name"
              id="display-name"
              type="text"
              name="display-name"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              disabled={!isEditing}
            />
            <Input
              id="username"
              label="Username"
              type="text"
              name="username"
              value={user?.username}
              placeholder="username"
              disabled
            />
          </div>

          <div>
            <Input
              id="email"
              label="Email"
              type="email"
              name="email"
              placeholder="email"
              value={user?.email}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="font-medium">
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
              disabled={!isEditing}
              className="resize-none rounded-md border border-border px-3 py-2 text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-muted disabled:cursor-not-allowed"
            />
          </div>
          <div className="mt-8 flex justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-primary/5"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 rounded-xl border border-danger/30 bg-surface p-6">
          <h2 className="text-lg font-semibold text-danger">Danger Zone</h2>

          <p className="mt-1 text-sm text-muted">
            Permanently delete your account and associated data. This action
            cannot be undone.
          </p>

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="mt-4 rounded-lg border border-danger px-4 py-2 text-sm font-medium text-danger transition hover:bg-danger/5"
          >
            Delete Account
          </button>
        </div>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-heading">
                Delete your account?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                This will permanently delete your account and associated data.
                This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
