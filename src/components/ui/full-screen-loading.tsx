"use client";

import { useLoading } from '@/context/loading-context';
import Lottie from "lottie-react";
import animationData from "@/lib/loading-animation.json";

export function FullScreenLoading() {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Lottie animationData={animationData} loop={true} style={{ width: 150, height: 150 }} />
    </div>
  );
}
