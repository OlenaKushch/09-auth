'use client';
import { EditMe, updateMe } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues: EditMe = {
        username: formData.get("username") as string,
      };

      const updatedUser = await updateMe(formValues);

      if (updatedUser) {
        setUser(updatedUser);
        router.push("/profile");
        return;
      }

      setError("Something went wrong");
    } catch (err: unknown) {
      
      if (typeof err === "object" && err !== null) {
        
        const axiosError = err as any;

        const message =
          axiosError?.response?.data?.error ??
          axiosError?.response?.data?.message ??
          axiosError?.message ??
          "Oops... some error";

        setError(message);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || ""}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              defaultValue={user?.username}
              type="text"
              className={css.input}
            />
          </div>

          <p>Email: {user?.email}</p>
          <p className={css.error}>{error}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
