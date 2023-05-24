"use client";

import { useOfferContext } from "@/app/hooks/OfferProvider";
import "./style.css";

export const Loading = () => {
  const { isLoading } = useOfferContext();

  return (
    isLoading && (
      <div className="fixed w-screen h-screen flex justify-center items-center z-10 bg-white opacity-75">
        <span className="loader"></span>
      </div>
    )
  );
};
