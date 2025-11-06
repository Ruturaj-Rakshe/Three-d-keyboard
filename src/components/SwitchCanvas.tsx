"use client";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import { Switch } from "@/components/Switch";

type SwitchCanvasProps = {
  colorName: "red" | "blue" | "brown" | "black";
  hexColor: string;
  onSoundPlay: () => void;
};

export default function SwitchCanvas({ colorName, hexColor, onSoundPlay }: SwitchCanvasProps) {
  return (
    <Canvas camera={{ position: [1.5, 2, 0], fov: 7 }} className="h-96 w-full">
      <Stage adjustCamera intensity={0.5} environment="city" shadows={"contact"}>
        <Switch
          onClick={onSoundPlay}
          rotation={[0, Math.PI / 4, 0]}
          color={colorName}
          hexColor={hexColor}
        />
      </Stage>
    </Canvas>
  );
}