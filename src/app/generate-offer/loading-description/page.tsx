"use client";

import { PageWrapper } from "@/app/components/PageWrapper";
import { Button, Card, Dropdown, DropdownItem } from "@tremor/react";
import { TextInput } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import "./style.css";

export default function LoadingDescription() {
  const router = useRouter();

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    console.log(router);
    // CUANDO CHAT GPT RESUELVA AUTO NAVEGAR A DESCRIPCIÓN
    setTimeout(() => {
      setShowLoading(true);
    }, 500);
    const timeout = setTimeout(() => {
      router.push("/generate-offer/description");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    showLoading && (
      <div className="h-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    )
  );
}
