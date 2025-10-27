import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/ui/modal/hooks/use-modal-context";
import { ToastProvider } from "@/components/ui/toast/hooks/use-toast-context";
import { AuthProvider } from "@/lib/indexedDb/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finanças Inteligentes | Tech Challenge FIAP",
  description:
    "Aplicativo financeiro desenvolvido no Tech Challenge da FIAP. Gerencie suas finanças pessoais com praticidade, controle de gastos e insights inteligentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
