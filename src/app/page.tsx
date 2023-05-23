"use client";

import Image from "next/image";
import { Card } from "@tremor/react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "./components/PageWrapper";

export default function Home() {
  const router = useRouter();

  return (
    <PageWrapper>
      <main className="flex gap-10 min-h-screen flex-col items-center p-6">
        <Image src="/infojobs.svg" width={150} height={150} alt="" />

        <div className="flex flex-col gap-10 self-center">
          <div className="flex flex-col items-center">
            <Image src="/hello.svg" width={150} height={150} alt="" />
            <p className="text-center">Hola! Elige entre estas dos opciones</p>
          </div>
          <div className="flex gap-10 self-center">
            <Card
              role="button"
              onClick={() => router.push("/generate-offer")}
              className="w-56 h-56 flex flex-col gap-5 justify-center items-center"
            >
              <Image src="/generateoffer.svg" width={100} height={100} alt="" />
              Generar oferta
            </Card>
            {/* CORREGIR OFERTA */}
            <Card
              role="button"
              className="w-56 h-56 flex flex-col gap-5 justify-center items-center"
            >
              <Image src="/evaluateoffer.svg" width={100} height={100} alt="" />
              Corregir oferta
            </Card>

            {/* Sacar media salarial entre todas las ofertas que hay publicadas por puesto de trabajo */}
            <Card
              role="button"
              className="w-56 h-56 flex flex-col gap-5 justify-center items-center"
            >
              <Image src="/salary.svg" width={100} height={100} alt="" />
              Media salarial
            </Card>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
