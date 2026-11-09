"use client";

import { BsSpotify } from "react-icons/bs";
import styles from "./login.module.css";
import { FaApple, FaFacebook } from "react-icons/fa";
import { LuSmartphone } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { useEmail } from "@/contexts/emailContext";
import React from "react";
import { createAuthClient } from "better-auth/react";
import { sendotpType } from "@/validations/sendotpSchema";
import { router } from "better-auth/api";

export default function Login() {
  const navigate = useRouter();
  const email = useStore(useEmail);
  const authClient = createAuthClient();

  async function signInGoogle() {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  }

  async function sendOtp(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch("api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.email }),
    });

    if (!response.ok) return;

    const data = await response.json();

    navigate.push("/verification");
    return data;
  }

  return (
    <>
      <main className={styles.main}>
        <section className={styles.secForm}>
          <BsSpotify size={45} color="white" />
          <h1>Olá de novo</h1>
          <form onSubmit={sendOtp} className={styles.form}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              required
              onChange={(e) => email.setEmail(e.target.value)}
            />

            <button type="submit" className={styles.sendBtn}>
              {" "}
              Continuar
            </button>
          </form>

          <p>ou</p>
          <button className={styles.button}>
            <LuSmartphone size={19} className={styles.icon} />
            Continuar com um número de <br /> telefone
          </button>
          <button onClick={signInGoogle} className={styles.button}>
            <FcGoogle size={19} className={styles.icon} />
            Continuar com o Google
          </button>
          <button className={styles.button}>
            <FaFacebook size={19} className={styles.icon} />
            Continuar com o Facebook
          </button>
          <button className={styles.button}>
            <FaApple size={19} className={styles.icon} />
            Continuar com a Apple
          </button>
        </section>
        <section className={styles.bottomMain}>
          <p>Não tem uma conta?</p>
          <h3 onClick={() => navigate.push('/signup')}>Inscrever-se</h3>
        </section>
      </main>
    </>
  );
}
