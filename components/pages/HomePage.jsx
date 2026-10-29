'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import Layout from '../site/Layout';
import {Process,Testimonials,FAQ,BlogCards} from '../site/Sections';
import {CreativeBook} from '../site/Immersive';
import {ContainerScroll} from '@/components/ui/container-scroll-animation';
import World from '../experience/World';
import Expertise from '../experience/Expertise';
import ProjectInvitation from '../experience/ProjectInvitation';
import {supabase} from '@/lib/site/supabase';
export default function HomePage(){const [hero,setHero]=useState(null);useEffect(()=>{if(supabase)supabase.from('site_settings').select('value').eq('key','hero_image').maybeSingle().then(({data})=>setHero(data?.value||null))},[]);return <Layout><World hero={hero}/><div className="kinetic-band" aria-hidden="true"><div>STRATEGY + DESIGN + TECHNOLOGY + GROWTH + STRATEGY + DESIGN + TECHNOLOGY + GROWTH + </div></div><Expertise/><section className="lab-showcase"><ContainerScroll titleComponent={<><span className="lab-label">04 / INSIDE CLICKKART</span><h2>HUMAN THINKING.<br/><em>DIGITAL POSSIBILITIES.</em></h2></>}><div className="showcase-image"><img src={hero?.url||'/assets/about.jpg'} alt={hero?.alt||'People collaborating on digital projects'}/><div><span>YOUR IDEAS. OUR SHARED AMBITION.</span><Link href="/about-us">A LITTLE ABOUT US <ArrowUpRight size={22}/></Link></div></div></ContainerScroll></section><CreativeBook/><div className="lab-process"><Process/></div><div className="lab-testimonials"><Testimonials/></div><section className="section wrap lab-journal"><div className="lab-section-top"><span className="lab-label">07 / FIELD NOTES</span><Link href="/blog" className="bracket-link">[ THE JOURNAL <ArrowUpRight size={16}/> ]</Link></div><h2>THINKING<br/><em>OUT LOUD.</em></h2><BlogCards/></section><FAQ/><ProjectInvitation/></Layout>}
