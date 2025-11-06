"use client"; 
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Mask } from "@react-three/drei";
import gsap from "gsap";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP)

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {

  useGSAP(() => {
    const split = SplitText.create(".hero-heading", {type: "lines, words, chars",
      mask: "lines",
      linesClass: "line++"
    });

    const tl = gsap.timeline({delay: 4.2})

    tl.from(split.chars, {
      opacity:0,
      y:-120,
      ease: "back",
      duration: 0.4,
      stagger: 0.07,
    }).to(".hero-body", {
      opacity:1,
      ease: "power2.out",
      duration: 0.6,
    })

    gsap.fromTo(".hero-scene", {
      background: "linear-gradient(to bottom, #000000, #0f172a, #062f4a, #7fa0b9)"
    }, {
      background: "linear-gradient(to bottom, #ffffff, #ffffff, #ffffff, #ffffff)",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "50% bottom",
        scrub: 1,
      }

    })


  }, [])




  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="h-dvh hero relative text-white text-shadow-black/30 text-shadow-lg motion-safe:h-[500vh]"
    >
      <div className="hero-scene sticky pointer-events-none top-0 h-dvh w-full">
        <Canvas shadows="soft">
          <Scene/>
        </Canvas>
      </div>

      <div className="hero-content absolute inset-x-0 top-0 h-dvh">
        <Bounded fullWidth className="absolute top-18 inset-x-0 md:top-24 md:left-[8vw]">
          <PrismicRichText field={slice.primary.heading} components={{
            heading1: ({children}) => (
              <h1 className="hero-heading font-black-slanted uppercase text-6xl leading-[0.8] sm:text-7xl lg:text-8xl">
                {children}
              </h1>
            )
          }}/>
        </Bounded>
        <Bounded fullWidth className="hero-body absolute bottom-0 inset-x-0 md:right-[8vw] md:left-auto opacity-0" innerClassName="flex flex-col gap-3">
          <div className="max-w-md">
            <PrismicRichText field={slice.primary.body} components={{
              heading2: ({children}) => (
                <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">
                  {children}
                </h2>
              )
            }}/>
          </div>

          <button className="group font-bold-slanted flex cursor-pointer w-fit items-center gap-1 rounded bg-[#01A7E1] px-3 py-1 text-2xl uppercase transition disabled:grayscale">
            {slice.primary.buy_button_text}
            <span className="group-hover:translate-x-1 transition">
              {"=>"}
            </span>
          </button>
        </Bounded>
      </div>



    </section>
  );
};

export default Hero;
