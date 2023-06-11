"use client";

import "./globals.css";
import { Titillium_Web } from "next/font/google";
import { OfferProvider } from "./hooks/OfferProvider";
import { Loading } from "./components/loading/loading";

const titilium = Titillium_Web({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Infojobs AI job offer generator</title>
        <meta
          name="description"
          content="Generador de ofertas con IA. Corrector sobre la oferta generada o sobre una oferta escrita que proporciona una puntuación y recomendaciones para mejorar la oferta con IA. Generador de una landing de la oferta creada con IA."
        />
      </head>
      <body className={titilium.className}>
        <OfferProvider>
          <Loading />
          {children}
        </OfferProvider>
      </body>
    </html>
  );
}
