"use client";

import { FaEye, FaSpotify } from "react-icons/fa";
import styles from "./signup.module.css";
import { useEmail } from "@/contexts/emailContext";
import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { signupSchema, signupType } from "@/validations/signupSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [hide, setHide] = useState(true);
  const email = useEmail((state) => state.email);
  const setEmail = useEmail((state) => state.setEmail);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupType>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useRouter();

  async function sendOtp(dadosRes: signupType) {
    const response = await fetch("api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "applicaton/json" },
      body: JSON.stringify({
        name: dadosRes.name,
        email: dadosRes.email,
        password: dadosRes.password,
      }),
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    navigate.push("/verify-email");
    return data;
  }

  return (
    <>
      <main className={styles.main}>
        <section className={styles.secForm}>
          <h1>
            Inscreva-se <FaSpotify />
          </h1>
          <form onSubmit={handleSubmit(sendOtp)}>
            <div>
              <label>Nome</label>
              <input {...register("name")} type="text" />
            </div>
            <div>
              <label>E-mail</label>
              <div>
                <input
                  {...register("email")}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {hide}
              </div>
            </div>

            <div className={styles.divPass}>
              <label>Senha</label>
              <div>
                <input
                  {...register("password")}
                  type={hide ? "password" : "text"}
                />
                {hide ? (
                  <BsEyeSlash
                    color="grey"
                    size={25}
                    onClick={() => setHide(!hide)}
                  />
                ) : (
                  <FaEye
                    color="grey"
                    size={25}
                    onClick={() => setHide(!hide)}
                  />
                )}
              </div>
            </div>
            <button>Inscrever-se</button>
          </form>
        </section>
      </main>
    </>
  );
}
