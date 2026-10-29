'use client';
import SVGDraw from './svg-draw';
import {logoMark} from '@/lib/site/logo-mark';
// Original raster brand mark traced into vector outlines for the supplied SVGDraw component.
export function LogoDraw({size=70}:{size?:number}){return <div className="drawn-logo" style={{width:size,height:size}}><SVGDraw svg={logoMark} mode="draw" fit="contain" fillAfter={true} strokeColor="#b70a72" useOwnColor={true} strokeWidth={1} reverse={false} animateColor={false} colorFrom="#b70a72" duration={.45} stagger={0} delay={0} easing="power2.out" startAt={1} order="source" wipeFrom="right" replay={false} style={{width:size,height:size}}/></div>}
