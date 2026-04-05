"use client";

import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ReactNode } from "react";

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <SmoothScrollProvider hasFixedHeader={true}>
      {children}
    </SmoothScrollProvider>
  );
}
