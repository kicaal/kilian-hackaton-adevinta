"use client";

import { GenerateOfferForm } from "../components/GenerateOfferForm";
import { PageWrapper } from "../components/PageWrapper";
import { OfferProvider } from "../hooks/OfferProvider";

export default function GenerateOffer() {
  // Al generar oferta la descripción la pueda editar,
  // si la edita sugerir si lo que se ha añadido se puede mejorar o no
  // si la oferta es sobre programación que haga petición a sueldos.dev y opine sobre el salario
  //  si debería subir o no.

  return (
    <PageWrapper>
      <GenerateOfferForm />
    </PageWrapper>
  );
}
