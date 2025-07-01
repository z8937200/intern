"use client";

import Lottie from "lottie-react";
import animationData from "@/lib/loading-animation.json";

export function Loading() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <Lottie animationData={animationData} loop={true} style={{ width: 150, height: 150 }} />
        </div>
    );
}
