import { Button, Card, Italic, Text } from "@tremor/react";
import { useOfferContext } from "../hooks/OfferProvider";
import TextArea from "./Textarea";
import { Callout } from "@tremor/react";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const OfferForm = () => {
  const router = useRouter();

  const { offer, setOffer, checkOffer, offerReccomendations } =
    useOfferContext();

  const [rows, setRows] = useState<number>(10);

  useEffect(() => {
    if (offer) {
      const linesLength = offer.split(/\r\n|\r|\n/).length;

      linesLength < 4 ? setRows(10) : setRows(linesLength + 2);
    }
  }, [offer]);

  return (
    <div className="p-12">
      <Card className="max-w-6xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="light"
          className="self-start
          "
          icon={ArrowLeftIcon}
        >
          Volver
        </Button>
        <div className="flex flex-col gap-6">
          <div>
            <Text className="text-lg">Validación de oferta</Text>
            <Text>
              ¡Escribe aquí si ya tienes tu oferta laboral preparada y la
              quieres mejorar!
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <TextArea
              rows={rows}
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />
          </div>
          {offerReccomendations.message && (
            <Callout
              icon={
                offerReccomendations.score > 7
                  ? CheckCircleIcon
                  : ExclamationIcon
              }
              title="Correcciones sobre la oferta actual"
              color={offerReccomendations.score > 7 ? "teal" : "yellow"}
            >
              <div className="flex flex-col gap-2">
                <div>
                  {offerReccomendations.score > 7
                    ? "¡Buen trabajo! Quedaría refinarlo para tener la oferta perfecta"
                    : "Hay algunos puntos que podríamos mejorar para tener una oferta que destaque"}
                </div>
                <div className="text-lg">
                  Puntuación: {offerReccomendations.score}
                </div>
                <div>
                  <div className="text-lg">Recomendaciones</div>
                  <div> {offerReccomendations.message}</div>
                </div>
              </div>
            </Callout>
          )}
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1 justify-start">
              <Italic className="text-gray-400">
                ¡Si no consigues sacar buena puntuación prueba a generarla
                automaticamente!
              </Italic>
              <Button
                className="self-start"
                loading={false}
                onClick={() => router.push("/generate-offer")}
              >
                Generar oferta
              </Button>
            </div>
            <div className="flex gap-6 justify-end">
              <Button
                disabled={!offer}
                loading={false}
                onClick={() => checkOffer(offer)}
              >
                Corregir oferta
              </Button>
              <Button
                disabled={!offer}
                onClick={() => router.push("/landing")}
                loading={false}
              >
                Postular oferta en Infojobs
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
