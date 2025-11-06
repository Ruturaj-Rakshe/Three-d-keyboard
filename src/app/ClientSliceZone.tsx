"use client";

import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

type ClientSliceZoneProps = {
  slices: any;
};

export default function ClientSliceZone({ slices }: ClientSliceZoneProps) {
  return <SliceZone slices={slices} components={components} />;
}