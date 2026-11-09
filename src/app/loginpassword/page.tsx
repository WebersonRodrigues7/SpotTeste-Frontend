"use client";

import { useEmail } from "@/contexts/emailContext";
import styles from "./loginpassword.module.css";
import { FaEye } from "react-icons/fa";
import { BsEyeSlash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchema, loginType } from "@/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
export default function LoginPassword() {
  const [hide, setHide] = useState(true);
  const email = useEmail((state) => state.email);
  const setEmail = useEmail((state) => state.setEmail);
  const navigate = useRouter();
  const {
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {}, []);

  async function login(dados: loginType) {
    const response = await fetch("api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(dados),
    });

    if (!response.ok) return;
    const data = await response.json();
    navigate.push("/dashboard");
    return data;
  }

  return (
    <>
      <main className={styles.main}>
        <section className={styles.sectForm}>
          <ChevronLeft
            onClick={() => navigate.push("/")}
            className={styles.icon}
            strokeWidth="1.5"
            size={30}
          />
          <p className={styles.withPass}>Entrar com senha</p>
          <form onSubmit={handleSubmit(login)} className={styles.form}>
            <label htmlFor="email">E-mail</label>
            <input
              {...register("email")}
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValue("email", e.target.value, {
                  shouldValidate: true,
                });
              }}
            />
            <label htmlFor="password">Senha</label>
            <div className={styles.passwordDiv}>
              <input
                {...register("password")}
                className={styles.inputPass}
                type={hide ? "password" : "text"}
              />
              {hide ? (
                <BsEyeSlash
                  color="grey"
                  size={25}
                  onClick={() => setHide(!hide)}
                />
              ) : (
                <FaEye color="grey" size={25} onClick={() => setHide(!hide)} />
              )}
            </div>
            <button>Entrar</button>
          </form>
          <p onClick={() => navigate.push("/")} className={styles.noPass}>
            Entrar sem senha
          </p>
        </section>
      </main>
    </>
  );
}
