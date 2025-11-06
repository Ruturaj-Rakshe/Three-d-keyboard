import dynamic from "next/dynamic";

export const components = {
  bento_box: dynamic(() => import("./BentoBox")),
  hero: dynamic(() => import("./Hero")),
  many_keyboards: dynamic(() => import("./ManyKeyboards")),
  switch_playground: dynamic(() => import("./SwitchPlayground")),
};