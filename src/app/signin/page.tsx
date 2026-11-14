"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockIcon, MailIcon } from "lucide-react";

import { AuthShell } from "@/components/Auth/auth-shell";
import { GoogleIcon } from "@/components/Auth/google-icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getAppUrl } from "@/lib/app-url";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError(null);

    const { data, error: signInError } = await authClient.signIn.email({
      email,
      password,
      rememberMe: remember,
      callbackURL: getAppUrl(),
    });

    if (signInError) {
      setError(signInError.message ?? "We couldn't sign you in.");
      return;
    }

    setStatus(`Signed in as ${data?.user.email ?? email}.`);
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
        setError(error.message ?? "We couldn't start Google sign in.");
        return;
      }

      console.log("Google login initiated:", data);
    } catch (caught) {
      console.error("Something went wrong:", caught);
      setError("We couldn't start Google sign in.");
    }
  }

  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Resume your adventure with Wanderlust"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-brand hover:underline"
          >
            Sign Up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup className="gap-3">
          <Field className="gap-1.5">
            <FieldLabel
              htmlFor="sign-in-email"
              className="text-xs font-semibold"
            >
              Email Address
            </FieldLabel>
            <InputGroup className="h-9 rounded-sm border-border bg-muted shadow-none">
              <InputGroupAddon>
                <MailIcon className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                id="sign-in-email"
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
              htmlFor="sign-in-password"
              className="text-xs font-semibold"
            >
              Password
            </FieldLabel>
            <InputGroup className="h-9 rounded-sm border-border bg-muted shadow-none">
              <InputGroupAddon>
                <LockIcon className="size-3.5" />
              </InputGroupAddon>
              <InputGroupInput
                id="sign-in-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-9 text-xs"
              />
            </InputGroup>
          </Field>
        </FieldGroup>

        <div className="mt-3 flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <Checkbox
              checked={remember}
              onCheckedChange={setRemember}
              aria-label="Remember me"
            />
            Remember me
          </label>
          <Link
            href="#"
            className="text-xs font-medium text-brand hover:underline"
          >
            Forgot password?
          </Link>
        </div>

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
          Sign In
        </Button>

        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          Or continue with
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
