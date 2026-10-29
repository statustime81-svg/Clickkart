"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useReducedMotion, MotionValue } from "framer-motion";
// Adapted from the supplied ContainerScroll component, with compact spacing and reduced motion.
export const ContainerScroll = ({titleComponent,children}:{titleComponent:React.ReactNode;children:React.ReactNode}) => {
 const containerRef=useRef<HTMLDivElement>(null);
 const {scrollYProgress}=useScroll({target:containerRef,offset:['start start','end end']});
 const [isMobile,setIsMobile]=useState(false);const reduced=useReducedMotion();
 useEffect(()=>{const check=()=>setIsMobile(window.innerWidth<=768);check();window.addEventListener('resize',check);return()=>window.removeEventListener('resize',check)},[]);
 const rotate=useTransform(scrollYProgress,[0,1],reduced||isMobile?[0,0]:[18,0]);
 const scale=useTransform(scrollYProgress,[0,1],reduced?[1,1]:isMobile?[.98,1]:[.92,1]);
 const translate=useTransform(scrollYProgress,[0,1],reduced||isMobile?[0,0]:[0,-55]);
 return <section ref={containerRef} className="container-scroll"><div className="scroll-perspective" style={{perspective:'1200px'}}><Header translate={translate} titleComponent={titleComponent}/><Card rotate={rotate} scale={scale} translate={translate}>{children}</Card></div></section>;
};
export const Header=({translate,titleComponent}:{translate:MotionValue<number>;titleComponent:React.ReactNode})=><motion.div style={{translateY:translate}} className="scroll-header">{titleComponent}</motion.div>;
export const Card=({rotate,scale,children}:{rotate:MotionValue<number>;scale:MotionValue<number>;translate:MotionValue<number>;children:React.ReactNode})=><motion.div style={{rotateX:rotate,scale,boxShadow:'0 10px 20px #1500140a,0 35px 65px #3e063924,0 100px 100px #480c3410'}} className="scroll-card"><div className="scroll-card-inner">{children}</div></motion.div>;
