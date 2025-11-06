import dynamic from "next/dynamic";

export const components = {
  bento_box: dynamic(() => import("./BentoBox"), { ssr: false }),
  hero: dynamic(() => import("./Hero"), { ssr: false }),
  many_keyboards: dynamic(() => import("./ManyKeyboards"), { ssr: false }),
  switch_playground: dynamic(() => import("./SwitchPlayground"), { ssr: false }),
};