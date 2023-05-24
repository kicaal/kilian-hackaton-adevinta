"use client";

import { PageWrapper } from "@/app/components/PageWrapper";
import { TextArea } from "@/app/components/Textarea";
import { OfferProvider, useOfferContext } from "@/app/hooks/OfferProvider";
import { Button, Card } from "@tremor/react";

export default async function Description() {
  const { offer } = useOfferContext();

  return (
    <PageWrapper>
      <div className="p-12 transition">
        <Card className="max-w-6xl mx-auto">
          <TextArea value={offer} onChange={(value) => console.log(value)} />
          <Button loading={false} className="self-end">
            Corregir oferta
          </Button>
        </Card>
      </div>
    </PageWrapper>
  );
}
