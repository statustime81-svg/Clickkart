'use client';
import {useEffect,useState,useRef} from 'react';
import {usePathname} from 'next/navigation';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
import {LogoDraw} from '@/components/ui/logo-draw';
export default function PageTransition(){const path=usePathname();const [visible,setVisible]=useState(false);const reduced=useReducedMotion();const previousPath=useRef(path);useEffect(()=>{if(previousPath.current===path)return;previousPath.current=path;if(reduced)return;setVisible(true);const id=setTimeout(()=>setVisible(false),380);return()=>clearTimeout(id)},[path,reduced]);return <AnimatePresence>{visible&&<motion.div className="route-curtain" aria-hidden="true" initial={{opacity:1}} exit={{opacity:0,transition:{duration:.25}}}><LogoDraw size={86}/><span>CLICKS INTO POSSIBILITIES.</span></motion.div>}</AnimatePresence>}
