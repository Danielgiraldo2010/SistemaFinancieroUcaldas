"use client";

import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";

import { useForgotPassword, useLink } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const Link = useLink();

  const { mutate: forgotPassword } = useForgotPassword();

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    forgotPassword({
      email,
    });
  };

  return (
    <div className="relative min-h-svh overflow-hidden">
      <div className="login-bg-zoom absolute inset-0 bg-[url('/image/bg-universidad.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[#064f85]/48 sm:bg-[#064f85]/44 lg:bg-[#064f85]/42" />

      <main
        className={cn(
          "relative z-10 flex min-h-svh w-full flex-col items-center",
          "justify-center gap-5 px-5 py-7",
          "sm:px-6",
          "md:gap-8 md:px-10 md:py-10",
          "lg:flex-row lg:justify-between lg:gap-16 lg:px-[12vw]",
        )}
      >
        <div className="flex h-[88px] w-full items-end justify-center min-[390px]:h-[108px] md:hidden">
          <img
            src="/image/logo1ucaldas.png"
            alt="Universidad de Caldas"
            className="h-auto w-[112px] object-contain brightness-0 invert drop-shadow-[0_5px_16px_rgba(0,0,0,0.42)] min-[390px]:w-[128px]"
          />
        </div>

        <section
          className={cn(
            "hidden w-full items-center justify-center gap-10 md:flex",
            "md:max-w-[560px]",
            "lg:max-w-[520px] lg:flex-1 lg:gap-12",
          )}
          aria-label="Logos institucionales"
        >
          <img
            src="/image/logo1ucaldas.png"
            alt="Universidad de Caldas"
            className="h-auto w-[235px] max-w-[58%] object-contain brightness-0 invert drop-shadow-[0_4px_14px_rgba(0,0,0,0.36)] lg:w-[320px]"
          />
          <img
            src="/image/logo-cidt.png"
            alt="CIDT"
            className="h-auto w-[108px] max-w-[28%] object-contain brightness-0 invert drop-shadow-[0_4px_14px_rgba(0,0,0,0.36)] lg:w-[160px]"
          />
        </section>

        <section
          className={cn(
            "w-full max-w-[360px] rounded-[14px]",
            "bg-white/91 px-6 py-8 shadow-[0_18px_60px_rgba(1,34,63,0.24)]",
            "backdrop-blur-[2px]",
            "sm:max-w-[385px] sm:px-10 sm:py-11",
            "md:max-w-[420px]",
            "lg:max-w-[385px]",
          )}
        >
          <div
            className={cn(
              "mb-7 flex h-11 w-11 items-center justify-center rounded-full",
              "bg-[#004b82]/10 text-[#004b82]",
            )}
          >
            <Mail className="h-5 w-5" />
          </div>

          <div className="mb-7">
            <h1 className="text-[26px] font-bold leading-tight text-[#004b82]">
              Recuperar Acceso
            </h1>
            <p className="mt-1 text-sm leading-5 text-[#626b77]">
              Ingresa tu correo institucional para recibir las instrucciones.
            </p>
          </div>

          <form onSubmit={handleForgotPassword}>
            <div className={cn("flex", "flex-col", "gap-2")}>
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-[#303846]"
              >
                Correo Institucional
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@ucaldas.edu.co"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "h-[50px] rounded-[10px] border-[#d9dee7] bg-white/88",
                  "px-4 text-base text-[#2f3947] shadow-none",
                  "placeholder:text-[#8b96a8]",
                  "focus-visible:border-[#0a4f82] focus-visible:ring-[#0a4f82]/20",
                )}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className={cn(
                "mt-7 h-[49px] w-full rounded-[10px]",
                "bg-[#004b82] text-base font-bold text-white",
                "hover:bg-[#003f6e] focus-visible:ring-[#004b82]/30",
              )}
            >
              Enviar instrucciones
            </Button>

            <Link
              to="/login"
              className={cn(
                "mx-auto mt-5 inline-flex",
                "items-center",
                "gap-2",
                "text-sm",
                "font-medium",
                "text-[#004b82]",
                "hover:underline",
                "transition-colors",
              )}
            >
              <ArrowLeft className={cn("w-4", "h-4")} />
              <span>Volver al inicio de sesión</span>
            </Link>
          </form>
        </section>

        <div className="flex h-[52px] w-full items-start justify-center min-[390px]:h-[64px] md:hidden">
          <img
            src="/image/logo-cidt.png"
            alt="CIDT"
            className="h-auto w-[68px] object-contain brightness-0 invert drop-shadow-[0_4px_12px_rgba(0,0,0,0.42)] min-[390px]:w-[76px]"
          />
        </div>
      </main>
    </div>
  );
};

ForgotPasswordForm.displayName = "ForgotPasswordForm";
