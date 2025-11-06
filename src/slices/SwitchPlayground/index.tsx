"use client";
import { FC, useEffect, useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import { SOUND_MAP, Switch } from "@/components/Switch";
import clsx from "clsx";
import { FadeIn } from "@/components/FadeIn";
import gsap from "gsap";

/**
 * Props for `SwitchPlayground`.
 */
export type SwitchPlaygroundProps =
  SliceComponentProps<Content.SwitchPlaygroundSlice>;

/**
 * Client-only wrapper
 */
const ClientOnly: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return <>{children}</>;
};

/**
 * Main Component
 */
const SwitchPlayground: FC<SwitchPlaygroundProps> = ({ slice }) => {
  return (
    <Bounded>
      <FadeIn>
        <h2 className="font-black-slanted scroll-pt-6 text-6xl uppercase md:text-8xl">
          <PrismicText field={slice.primary.heading} />
        </h2>

        <div className="mb-6 max-w-4xl text-xl text-pretty">
          <PrismicRichText field={slice.primary.description} />
        </div>

        <FadeIn
          targetChildren
          className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2"
        >
          {slice.primary.switches.map((item) =>
            isFilled.contentRelationship(item.switch) ? (
              <ClientOnly key={item.switch.id}>
                <SharedCanvas switchDocument={item.switch} />
              </ClientOnly>
            ) : null
          )}
        </FadeIn>
      </FadeIn>
    </Bounded>
  );
};

export default SwitchPlayground;

/**
 * SharedCanvas component (client-only)
 */
type SharedCanvasProps = {
  switchDocument: Content.SwitchPlaygroundSliceDefaultPrimarySwitchesItem["switch"];
};

const SharedCanvas = ({ switchDocument }: SharedCanvasProps) => {
  if (!isFilled.contentRelationship(switchDocument) || !switchDocument.data) return null;

  const switchName = switchDocument.data.name || "";
  const hexColor = switchDocument.data.color || "";

  const colorMap: Record<string, "red" | "blue" | "brown" | "black"> = {
    "#FF0000": "red",
    "#0000FF": "blue",
    "#964B00": "brown",
    "#000000": "black",
  };

  const bgColor = {
    red: "bg-red-950",
    blue: "bg-sky-950",
    brown: "bg-amber-950",
    black: "bg-gray-900",
  }[switchName] || "bg-gray-900";

  const colorName = colorMap[hexColor] || "red";

  const handleSound = () => {
    const selectedSound = gsap.utils.random(SOUND_MAP[colorName]);
    const audio = new Audio(selectedSound);
    audio.volume = 0.6;
    audio.play();
  };

  return (
    <div className="group relative min-h-96 overflow-hidden rounded-3xl select-none">
      <Canvas camera={{ position: [1.5, 2, 0], fov: 7 }} className="h-96 w-full">
        <Stage adjustCamera intensity={0.5} environment="city" shadows={"contact"}>
          <ClientOnly>
             <Switch
            onClick={handleSound}
            rotation={[0, Math.PI / 4, 0]}
            color={colorName}
            hexColor={hexColor || ""}
          />
          </ClientOnly>
         
        </Stage>
      </Canvas>

      <div
        className={clsx(
          "font-black-slanted absolute inset-0 -z-10 grid place-items-center text-8xl uppercase",
          bgColor
        )}
      >
        <svg className="pointer-events-none h-auto w-full" viewBox="0 0 75 100">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            className="font-black-slanted fill-white/30 uppercase mix-blend-overlay group-hover:fill-white motion-safe:transition-all motion-safe:duration-700"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <tspan key={i} x={`${(i + 1) * 10}%`} dy={i === 0 ? -40 : 14}>
                {switchName}
                {switchName}
                {switchName}
              </tspan>
            ))}
          </text>
        </svg>
      </div>
    </div>
  );
};
