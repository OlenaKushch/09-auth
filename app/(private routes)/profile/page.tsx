
import { Metadata } from "next";
import css from './ProfilePage.module.css';

import { getMe } from "@/lib/api/serverApi";
import Link from "next/link";
import Image from "next/image";


export const metadata: Metadata ={
    title: "Profile",
    description: "Change your profile",
    openGraph: {
        title: "Profile",
        description: "Change your profile",
        url: 'https://09-auth-nine-jet.vercel.app/',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: "Profile"
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Profile",
        description: "Change your profile",
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
};

export default async function ProfilePage() {
  const profile = await getMe();

    return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={profile?.avatar || "/placeholder.png"}
            alt={profile?.username || "User Avatar"}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </div>
      </div>
    </main>
  );
}