"use client";

import Image from "next/image";
import { Card } from "@tremor/react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "./components/PageWrapper";
import { useOfferContext } from "./hooks/OfferProvider";

export default function Home() {
  const router = useRouter();

  const { setOffer, setOfferRecommendations } = useOfferContext();

  return (
    <PageWrapper>
      <main className="flex flex-col gap-10 min-h-screen items-center p-6">
        <Image src="/infojobs.svg" width={150} height={150} alt="" />

        <div className="flex flex-col gap-10 self-center">
          <div className="flex flex-col items-center">
            <Image src="/hello.svg" width={150} height={150} alt="" />
            <p className="text-center">¡Hola! Elige una de las opciones</p>
          </div>
          <div className="flex flex-col md:flex-row gap-10 self-center">
            <Card
              role="button"
              onClick={() => router.push("/generate-offer")}
              className="w-56 h-56 flex flex-col gap-5 justify-center items-center"
            >
              <Image src="/generateoffer.svg" width={100} height={100} alt="" />
              Generar oferta
            </Card>
            <Card
              onClick={() => {
                setOffer("");
                setOfferRecommendations({ score: 0, message: "" });
                router.push("/offer");
              }}
              role="button"
              className="w-56 h-56 flex flex-col gap-5 justify-center items-center"
            >
              <Image src="/evaluateoffer.svg" width={100} height={100} alt="" />
              Corregir oferta
            </Card>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
