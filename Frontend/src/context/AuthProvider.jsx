import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { getUser } from "../services/user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const response = await getUser();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, reFetchUser: fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
