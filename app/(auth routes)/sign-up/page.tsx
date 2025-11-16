'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Credentials, login, register } from '@/lib/api/clientApi';
import { useAuthStore } from "@/lib/store/authStore";
import css from './SignInPage.module.css';

export default function SignIn() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (formData: FormData) => {
        try {
            const userData = Object.fromEntries(
                formData
            ) as unknown as Credentials;
            const user = await register(userData);
            if (user) {
                setUser(user);
                router.push('/profile');
            }
        } catch {
            setError('Ooops, some error');
        }
    };

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign in</h1>

            <form className={css.form} action={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='email'
                        name='email'
                        className={css.input}
                        required
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        className={css.input}
                        required
                    />
                </div>

                <div className={css.actions}>
                    <button type='submit' className={css.submitButton}>
                        Log in
                    </button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>
    );
}
