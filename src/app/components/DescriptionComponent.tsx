"use client";

import { Button, Card } from "@tremor/react";
import { PageWrapper } from "./PageWrapper";
import { TextArea } from "./Textarea";

export const DescriptionComponent = ({ value }: { value: string }) => {
  return (
    <PageWrapper>
      <div className="p-12 transition">
        <Card className="max-w-6xl mx-auto">
          <TextArea value={value} onChange={(value) => console.log(value)} />
          <Button loading={false} className="self-end">
            Corregir oferta
          </Button>
        </Card>
      </div>
    </PageWrapper>
  );
};
