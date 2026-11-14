"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";

import { AuthShell } from "@/components/Auth/auth-shell";
import { GoogleIcon } from "@/components/Auth/google-icon";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getAppUrl } from "@/lib/app-url";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Fill in all fields to create your account.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setError(null);

    const { data, error: signUpError } = await authClient.signUp.email({
      name: fullName,
      email,
      password,
      callbackURL: getAppUrl(),
    });

    if (signUpError) {
      setError(signUpError.message ?? "We couldn't create your account.");
      return;
    }

    setStatus(`Account created for ${data?.user.email ?? email}.`);
    router.push("/");
    router.refresh();
  }

  async function handleOAuthWithGoogle() {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: getAppUrl(),
      });

      if (error) {
        console.error("Google login failed:", error.message);
        return;
      }

      console.log("Google login initiated:", data);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  }

  return (
    <AuthShell
      title="Create Account"
      subtitle="Start your adventure with Wanderlust"
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-brand hover:underline"
          >
            Sign In
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup className="gap-3">
          <Field className="gap-1.5">
            <FieldLabel
              htmlFor="sign-up-name"
              className="text-xs font-semibold"
            >
              Full Name
            </FieldLabel>
            <InputGroup className="h-9 rounded-sm border-border bg-muted shadow-none">
              <InputGroupAddon>
                <UserIcon className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                id="sign-up-name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="h-9 text-xs"
              />
            </InputGroup>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel
              htmlFor="sign-up-email"
              className="text-xs font-semibold"
            >
              Email Address
            </FieldLabel>
            <InputGroup className="h-9 rounded-sm border-border bg-muted shadow-none">
              <InputGroupAddon>
                <MailIcon className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                id="sign-up-email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-9 text-xs"
              />
            </InputGroup>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel
              htmlFor="sign-up-password"
              className="text-xs font-semibold"
            >
              Password
            </FieldLabel>
            <InputGroup className="h-9 rounded-sm border-border bg-muted shadow-none">
              <InputGroupAddon>
                <LockIcon className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                id="sign-up-password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-9 text-xs"
              />
            </InputGroup>
          </Field>

          <Field className="gap-1.5">
            <FieldLabel
              htmlFor="sign-up-confirm-password"
              className="text-xs font-semibold"
            >
              Confirm Password
            </FieldLabel>
            <InputGroup className="h-9 rounded-sm border-border bg-muted shadow-none">
              <InputGroupAddon>
                <LockIcon className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                id="sign-up-confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="h-9 text-xs"
              />
            </InputGroup>
          </Field>
        </FieldGroup>

        {error ? (
          <p role="alert" className="mt-3 text-xs text-destructive">
            {error}
          </p>
        ) : null}

        {status ? (
          <p role="status" className="mt-3 text-xs text-muted-foreground">
            {status}
          </p>
        ) : null}

        <Button
          type="submit"
          className="mt-4 h-9 w-full rounded-sm bg-brand text-xs font-semibold text-brand-foreground hover:bg-brand/90"
        >
          Create Account
        </Button>

        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          Or sign up with
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-9 w-full gap-2 rounded-sm border-border bg-card text-xs font-medium"
          onClick={handleOAuthWithGoogle}
        >
          <GoogleIcon className="size-4" />
          Sign Up With Google
        </Button>
      </form>
    </AuthShell>
  );
}
