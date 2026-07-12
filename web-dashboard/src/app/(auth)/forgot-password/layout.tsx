import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kostify - Lupa Password",
  description: "Atur ulang kata sandi akun owner Kostify Anda secara praktis.",
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
