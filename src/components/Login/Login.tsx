import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useFetch } from "../../hooks/useFetch";

export const Login: React.FC = () => {
  const { setUser } = useContext(UserContext) ?? {};
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [creds, setCreds] = useState<{} | null>(null);

  const {
    data: user,
    loading,
    error,
  } = useFetch(creds ? "login" : null, "POST", creds);

  const handleLogin = (e: React.FormEvent) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!email) {
      setEmailError("Email cannot be blank");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setCreds({ email: email });
  };

  useEffect(() => {
    if (user) setUser?.(user.data);
  }, [user, setUser]);

  return (
    <form onSubmit={handleLogin}>
      {!user && !loading && !error && (
        <div className="flex">
          <div className="flex flex-col">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="text-black mr-4 rounded-md px-2 py-1"
              placeholder="Email Address"
              type="email"
            />
            {emailError && <p className="text-[10px] mt-1">{emailError}</p>}
          </div>
          <button type="submit">Login</button>
        </div>
      )}
      {loading && <p>Logging in...</p>}
      {error && <p>Error logging in</p>}
    </form>
  );
};
