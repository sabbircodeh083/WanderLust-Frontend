import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  footer,
  children,
}: {
  title: string;
  subtitle: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] justify-center bg-muted px-4 py-14 md:py-20">
      <div className="w-full max-w-[360px]">
        <div className="text-center">
          <h1 className="text-[32px] leading-tight font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mt-8 border border-border bg-card p-6 shadow-md shadow-black/5">
          {children}
        </div>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {footer}
        </p>
      </div>
    </main>
  );
}
