'use client';
import {lazy,Suspense,useRef,useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
const SignalScene=lazy(()=>import('./SignalScene'));
export default function ProjectInvitation(){const host=useRef();const [near,setNear]=useState(false);useEffect(()=>{const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setNear(true);observer.disconnect()}},{rootMargin:"200px"});if(host.current)observer.observe(host.current);return()=>observer.disconnect()},[]);return <section ref={host} className="project-invitation"><div className="invitation-object">{near&&<Suspense fallback={null}><SignalScene compact tint="#b5baf5"/></Suspense>}</div><div className="wrap invitation-copy"><span className="lab-label">A GOOD CONVERSATION CHANGES EVERYTHING.</span><h2>GOT A<br/><em>BIG IDEA?</em></h2><Link href="/contact-us" className="invitation-link">LET’S BRING IT TO LIFE <ArrowUpRight/></Link><span className="invitation-bottom">YOUR NEXT CHAPTER STARTS HERE.</span></div></section>}
