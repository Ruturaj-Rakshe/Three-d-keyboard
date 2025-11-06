import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import dynamic from "next/dynamic";

import { createClient } from "@/prismicio";

// Dynamically import the SliceZone with no SSR
const ClientSliceZone = dynamic(() => import("./ClientSliceZone"), { 
  ssr: false 
});

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return <ClientSliceZone slices={page.data.slices} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}