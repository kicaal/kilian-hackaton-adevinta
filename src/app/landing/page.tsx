"use client";

import { PageWrapper } from "@/app/components/PageWrapper";
import { OfferForm } from "../components/OfferForm";
import { useOfferContext } from "../hooks/OfferProvider";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import { useEffect, useState } from "react";
import "./styles.css";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();
  const { convertToHtml, offer } = useOfferContext();

  const [offerHtml, setOfferHtml] = useState<string>("");

  useEffect(() => {
    const getHtml = async () => {
      const html = await convertToHtml();

      setOfferHtml(html);
    };

    if (offer) {
      getHtml();
    }
  }, [offer]);

  return (
    <PageWrapper>
      <header className="flex justify-between bg-white p-6">
        <Image
          role="button"
          onClick={() => router.push("/")}
          src="/infojobs.svg"
          width={150}
          height={150}
          alt=""
        />
        <a href="https://github.com/kicaal" target="_blank">
          <BsGithub size={30} />
        </a>
      </header>
      <Button
        className="p-4"
        onClick={() => router.back()}
        variant="light"
        icon={ArrowLeftIcon}
      >
        <span className="text-xl">Volver</span>
      </Button>
      {offerHtml && (
        <div className="flex justify-center my-4">
          <div className="flex gap-2 items-center py-2 px-4 border border-[#00A550] rounded-md">
            <span>¡Oferta postulada con exito!</span>
            <CheckCircleIcon className="text-[#00A550] w-6" />
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center max-w-4xl mx-auto bg-white">
        <img
          className="w-full h-56 object-cover"
          src="/bg-landing.svg"
          alt=""
        />
        {offer ? (
          offerHtml ? (
            <div
              className="p-6 flex flex-col gap-4 "
              dangerouslySetInnerHTML={{ __html: offerHtml }}
            />
          ) : (
            <p className="text-center py-24 text-lg">Cargando oferta...</p>
          )
        ) : (
          <div className="py-24 flex flex-col justify-center">
            <p className="text-center  text-lg">
              No hay ninguna oferta que postural, porfavor, vuelve a la pantalla
              principal y crea una
            </p>
            <Button
              className="self-center"
              onClick={() => router.push("/")}
              variant="light"
              icon={ArrowLeftIcon}
            >
              <span className="text-xl">Volver</span>
            </Button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
