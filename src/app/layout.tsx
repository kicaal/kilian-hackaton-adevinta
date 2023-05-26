"use client";

import "./globals.css";
import { Titillium_Web } from "next/font/google";
import { OfferProvider } from "./hooks/OfferProvider";
import { Loading } from "./components/loading/loading";

const titilium = Titillium_Web({
  weight: "400",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Hackaton infojobs",
//   description: "Generador ofertas",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={titilium.className}>
        <OfferProvider>
          <Loading />
          {children}
        </OfferProvider>
      </body>
    </html>
  );
}
