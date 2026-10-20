import type { ReactNode } from "react";

type AuthScreenLayoutProps = {
  title: string;
  children: ReactNode;
};

export function AuthScreenLayout({ title, children }: AuthScreenLayoutProps) {
  return (
    <main className="mx-auto flex max-w-form flex-col gap-6 p-6">
      <h1 className="text-title">{title}</h1>
      {children}
    </main>
  );
}
