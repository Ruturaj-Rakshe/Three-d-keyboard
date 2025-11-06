"use client";
import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";

type ClientCanvasProps = {
  children: ReactNode;
  className?: string;
  camera?: any;
  shadows?: any;
};

export default function ClientCanvas({ children, className, camera, shadows }: ClientCanvasProps) {
  return (
    <Canvas className={className} camera={camera} shadows={shadows}>
      {children}
    </Canvas>
  );
}