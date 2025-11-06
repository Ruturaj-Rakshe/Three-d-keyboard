"use client";

import { SliceZone } from "@prismicio/react";
import dynamic from "next/dynamic";

// Now we can use ssr: false because this is a client component
const components = {
  bento_box: dynamic(() => import("../slices/BentoBox"), { ssr: false }),
  hero: dynamic(() => import("../slices/Hero"), { ssr: false }),
  many_keyboards: dynamic(() => import("../slices/ManyKeyboards"), { ssr: false }),
  switch_playground: dynamic(() => import("../slices/SwitchPlayground"), { ssr: false }),
};

type ClientSliceZoneProps = {
  slices: any;
};

export default function ClientSliceZone({ slices }: ClientSliceZoneProps) {
  return <SliceZone slices={slices} components={components} />;
}