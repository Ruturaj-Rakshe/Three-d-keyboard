"use client";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FadeInProps = {
    children: React.ReactNode; //Anything inside the fadeIn component
    vars?: gsap.TweenVars; //This is helping me to add extra or additional animations
    start?: string,
    className?: string;
    targetChildren?: boolean; //If this is false, the children or the entire container fades in as one block, if true then they fade in one by one.
}

export function FadeIn({children, vars = {}, start = "top 50%", className, targetChildren}: FadeInProps){
        const containerRef = useRef<HTMLDivElement>(null);

        useGSAP(() => {
            const target = targetChildren ? containerRef.current?.children : containerRef.current;
            if(!target) return;

            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => { 

                gsap.set(target, {opacity: 0, y: 60});

                gsap.to(target, {
                    duration: 1,
                    opacity: 1,
                    ease: "power3.out",
                    y: 0,
                    stagger: 0.2,
                    ...vars, //Just means to merge the custom animations with the default ones.
                    scrollTrigger: {
                    trigger: containerRef.current,
                    start,
                }
            })
        });


        })
    return (
        <div ref={containerRef} className={clsx(className)}>
            {children}
        </div>
    )


}