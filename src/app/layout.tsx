import "./globals.css";
import { Titillium_Web } from "next/font/google";

const titilium = Titillium_Web({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hackaton infojobs",
  description: "Generador ofertas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={titilium.className}>{children}</body>
    </html>
  );
}
