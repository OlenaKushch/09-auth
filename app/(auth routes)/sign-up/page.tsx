"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUp() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const user = await register({ email, password });
      setUser(user);
      router.push("/profile");
    } catch {
      setError("Ooops, some error");
    }
  };

  return (
    <main>
      <h1>Register page</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 12, maxWidth: 300 }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}