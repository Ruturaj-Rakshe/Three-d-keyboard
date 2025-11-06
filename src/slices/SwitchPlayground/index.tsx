"use client";
import { FC, useEffect, useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import dynamic from "next/dynamic";
import { SOUND_MAP } from "@/components/Switch";
import clsx from "clsx";
import { FadeIn } from "@/components/FadeIn";
import gsap from "gsap";

// Dynamically import Canvas and Stage
const ClientCanvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const ClientStage = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Stage),
  { ssr: false }
);

const ClientSwitch = dynamic(() => import("@/components/Switch").then(mod => ({ default: mod.Switch })), { ssr: false });

export type SwitchPlaygroundProps = SliceComponentProps<Content.SwitchPlaygroundSlice>;

const ClientOnly: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return <>{children}</>;
};

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
      <ClientCanvas camera={{ position: [1.5, 2, 0], fov: 7 }} className="h-96 w-full">
        <ClientStage adjustCamera intensity={0.5} environment="city" shadows={"contact"}>
          <ClientSwitch
            onClick={handleSound}
            rotation={[0, Math.PI / 4, 0]}
            color={colorName}
            hexColor={hexColor || ""}
          />
        </ClientStage>
      </ClientCanvas>

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
            className="font-black-slanted fill-white/30 uppercase mix-blend-overlay group-hover:fill-white/30 motion-safe:transition-all motion-safe:duration-700"
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