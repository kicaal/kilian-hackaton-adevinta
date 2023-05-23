"use client";

import { PageWrapper } from "@/app/components/PageWrapper";
import { Button, Card, Dropdown, DropdownItem } from "@tremor/react";
import { TextInput } from "@tremor/react";
import { useRouter } from "next/navigation";

export default function Description() {
  const router = useRouter();

  const value = "texto generado";

  return (
    <PageWrapper>
      <div className="p-12 transition">
        <Card className="max-w-6xl mx-auto">
          <TextInput value={value} />
          <Button loading={false} className="self-end">
            Corregir oferta
          </Button>
        </Card>
      </div>
    </PageWrapper>
  );
}
