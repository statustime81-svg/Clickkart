'use client';
import {lazy,Suspense} from 'react';
import {ArrowUpRight} from 'lucide-react';
import Layout from '../site/Layout';
import EnquiryForm from '../site/EnquiryForm';
import {company} from '@/lib/site/data';
const SignalScene=lazy(()=>import('../experience/SignalScene'));
export default function ContactPage(){return <Layout><section className="contact-experience wrap"><div className="contact-intro"><span className="lab-label">A REAL CONVERSATION. A NEW POSSIBILITY.</span><h1>HELLO,<br/><em>WHAT’S NEXT?</em></h1><div className="contact-sculpture"><Suspense fallback={null}><SignalScene compact tint="#d864be"/></Suspense></div><p>Tell us about the idea you can’t stop thinking about.<br/>We’ll help you find its next move.</p><div className="contact-direct"><a href={`mailto:${company.email}`}>{company.email}<ArrowUpRight size={18}/></a><a href={`tel:${company.phone}`}>{company.phoneDisplay}<ArrowUpRight size={18}/></a><a href={company.whatsapp} target="_blank" rel="noreferrer">Start a WhatsApp conversation<ArrowUpRight size={18}/></a></div></div><div className="contact-form-stage"><EnquiryForm/></div></section><section className="wrap location-strip"><span className="lab-label">FIND US IN PATNA</span><p>{company.address}</p><a className="bracket-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`} target="_blank" rel="noreferrer">[ GET DIRECTIONS <ArrowUpRight size={16}/> ]</a></section></Layout>}
