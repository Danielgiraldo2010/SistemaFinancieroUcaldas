"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";

import { useRegister, useLink, useNotification } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputPassword } from "@/components/refine-ui/form/input-password";
import { cn } from "@/lib/utils";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { open } = useNotification();

  const Link = useLink();

  const { mutate: register } = useRegister();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      open?.({
        type: "error",
        message: "Passwords don't match",
        description:
          "Please make sure both password fields contain the same value.",
      });

      return;
    }

    register({
      email,
      password,
    });
  };

  // const handleSignUpWithGoogle = () => {
  //   register({
  //     providerName: "google",
  //   });
  // };

  // const handleSignUpWithGitHub = () => {
  //   register({
  //     providerName: "github",
  //   });
  // };

  return (
    <div className="relative min-h-svh overflow-hidden">
      <div className="login-bg-zoom absolute inset-0 bg-[url('/image/bg-universidad.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[#064f85]/48 sm:bg-[#064f85]/44 lg:bg-[#064f85]/42" />

      <main
          className={cn(
            "relative z-10 flex min-h-svh w-full flex-col items-center",
          "justify-center gap-4 px-5 py-5",
          "sm:px-6",
          "md:gap-6 md:px-10 md:py-7",
          "lg:flex-row-reverse lg:justify-between lg:gap-16 lg:px-[12vw]",
        )}
      >
        <div className="flex h-[78px] w-full items-end justify-center min-[390px]:h-[96px] md:hidden">
          <img
            src="/image/logo1ucaldas.png"
            alt="Universidad de Caldas"
            className="h-auto w-[104px] object-contain brightness-0 invert drop-shadow-[0_5px_16px_rgba(0,0,0,0.42)] min-[390px]:w-[120px]"
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
            "bg-white/91 px-6 py-6 shadow-[0_18px_60px_rgba(1,34,63,0.24)]",
            "backdrop-blur-[2px]",
            "sm:max-w-[385px] sm:px-9 sm:py-7",
            "md:max-w-[400px]",
            "lg:max-w-[385px] lg:px-10 lg:py-8",
          )}
        >
          <div
            className={cn(
              "mb-5 flex h-10 w-10 items-center justify-center rounded-full",
              "bg-[#004b82]/10 text-[#004b82]",
            )}
          >
            <UserPlus className="h-5 w-5" />
          </div>

          <div className="mb-5">
            <h1 className="text-[26px] font-bold leading-tight text-[#004b82]">
              Crear Cuenta
            </h1>
            <p className="mt-1 text-sm leading-5 text-[#626b77]">
              Registra tus credenciales institucionales para ingresar.
            </p>
          </div>

          <form onSubmit={handleSignUp}>
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
                  "h-[46px] rounded-[10px] border-[#d9dee7] bg-white/88",
                  "px-4 text-base text-[#2f3947] shadow-none",
                  "placeholder:text-[#8b96a8]",
                  "focus-visible:border-[#0a4f82] focus-visible:ring-[#0a4f82]/20",
                )}
              />
            </div>

            <div
              className={cn("relative", "flex", "flex-col", "gap-2", "mt-4")}
            >
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-[#303846]"
              >
                Contraseña
              </Label>
              <InputPassword
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className={cn(
                  "h-[46px] rounded-[10px] border-[#d9dee7] bg-white/88",
                  "px-4 text-base text-[#2f3947] shadow-none",
                  "placeholder:text-[#8b96a8]",
                  "focus-visible:border-[#0a4f82] focus-visible:ring-[#0a4f82]/20",
                )}
              />
            </div>

            <div
              className={cn("relative", "flex", "flex-col", "gap-2", "mt-4")}
            >
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-[#303846]"
              >
                Confirmar contraseña
              </Label>
              <InputPassword
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className={cn(
                  "h-[46px] rounded-[10px] border-[#d9dee7] bg-white/88",
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
                "mt-6 h-[48px] w-full rounded-[10px]",
                "bg-[#004b82] text-base font-bold text-white",
                "hover:bg-[#003f6e] focus-visible:ring-[#004b82]/30",
              )}
            >
              Crear Cuenta
            </Button>

            <div className={cn("mt-4 w-full text-center text-sm")}>
              <span className={cn("text-[#626b77]")}>
                ¿Ya tienes cuenta?{" "}
              </span>
              <Link
                to="/login"
                className={cn(
                  "font-semibold",
                  "text-[#004b82]",
                  "underline underline-offset-2",
                )}
              >
                Inicia sesión
              </Link>
            </div>
          </form>
        </section>

        <div className="flex h-[48px] w-full items-start justify-center min-[390px]:h-[58px] md:hidden">
          <img
            src="/image/logo-cidt.png"
            alt="CIDT"
            className="h-auto w-[64px] object-contain brightness-0 invert drop-shadow-[0_4px_12px_rgba(0,0,0,0.42)] min-[390px]:w-[72px]"
          />
        </div>
      </main>
    </div>
  );
};

SignUpForm.displayName = "SignUpForm";
