"use client";

import { useEffect, useState } from "react";
import styles from "./Verification.module.css";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { useEmail } from "@/contexts/emailContext";
import { signinotpType } from "@/validations/signinotpSchema";

interface IVerification {
  endpoint: string;
  navigation: string;
  hide: boolean;
}

export default function VerificationPage({
  endpoint,
  navigation,
  hide,
}: IVerification) {

  const [codigo, setCodigo] = useState<string[]>(["", "", "", "", "", ""]);
  const navigate = useRouter();
  const emailStore = useStore(useEmail);
  useEffect(() => {
    console.log(codigo);
  }, [codigo]);

  function alterarCodigo(posicao: number, valor: string) {
    if (!/^[0-9]?$/.test(valor)) return;

    const novoCodigo = [...codigo];

    novoCodigo[posicao] = valor;

    setCodigo(novoCodigo);
  }

  async function loginOtp(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch(`api/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailStore.email, otp: codigo.join("") }),
    });

    if (!response.ok) return;

    const data = await response.json();

    navigate.push(`/${navigation}`);
    return data;
  }
  return (
    <>
      <main className={styles.main}>
        <section className={styles.sectionTop}>
          <ChevronLeft
            onClick={() => navigate.push("/")}
            className={styles.icon}
            strokeWidth="1.5"
            size={30}
          />
          <p>
            Insira o código que enviamos <br /> para {emailStore.email[0]}
            *****@*****.com
          </p>
          <form onSubmit={loginOtp}>
            <div>
              <input
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={codigo[0]}
                onChange={(e) => {
                  alterarCodigo(0, e.target.value);
                }}
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={codigo[1]}
                onChange={(e) => {
                  alterarCodigo(1, e.target.value);
                }}
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={codigo[2]}
                onChange={(e) => {
                  alterarCodigo(2, e.target.value);
                }}
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={codigo[3]}
                onChange={(e) => {
                  alterarCodigo(3, e.target.value);
                }}
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={codigo[4]}
                onChange={(e) => {
                  alterarCodigo(4, e.target.value);
                }}
              />
              <input
                type="text"
                inputMode="numeric"
                value={codigo[5]}
                maxLength={1}
                onChange={(e) => {
                  alterarCodigo(5, e.target.value);
                }}
              />
            </div>
            <button>Avançar</button>
          </form>
        </section>
        <section className={styles.sectionBottom}>
          <button>Reenviar código</button>
          {hide && (
            <p onClick={() => navigate.push("/loginpassword")}>
              Entrar com senha
            </p>
          )}
        </section>
      </main>
    </>
  );
}
