import { createContext, useContext, useState } from "react";
import { load, save } from "./storage.js";

const AuthContext = createContext(null);
const USERS_KEY = "elmas_users";
const SESSION_KEY = "elmas_session";
const DEFAULT_PASSWORD = "123456"; // same default password rule as the original PHP registration

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => load(SESSION_KEY, null));

  // Equivalent of registor.php (INSERT INTO users)
  function register({ firstName, lastName, phone, email }) {
    const users = load(USERS_KEY, []);
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: "This email is already registered!" };
    }
    const newUser = {
      id: Date.now(),
      name: `${firstName.trim()} ${lastName.trim()}`.trim(),
      phone: phone.trim(),
      email: cleanEmail,
      password: DEFAULT_PASSWORD,
    };
    save(USERS_KEY, [...users, newUser]);
    return { ok: true };
  }

  // Equivalent of login.php (SELECT ... WHERE email = ...)
  function login(email, password) {
    const users = load(USERS_KEY, []);
    const found = users.find((u) => u.email === email.trim().toLowerCase());
    if (!found) return { ok: false, error: "No account mapping found with this email." };
    if (found.password !== password) {
      return { ok: false, error: "Invalid password credential security block!" };
    }
    const session = { id: found.id, name: found.name, email: found.email };
    save(SESSION_KEY, session);
    setUser(session);
    return { ok: true };
  }

  // Equivalent of logout.php
  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
