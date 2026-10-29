import {notFound} from 'next/navigation';
import ServicePage from '@/components/pages/ServicePage';
import {services} from '@/lib/site/data';
export async function generateMetadata({params}){const {slug}=await params;return {title:services.find(s=>s.slug===slug)?.short||'Solution'}}
export default async function Page({params}){const {slug}=await params;const service=services.find(s=>s.slug===slug);if(!service)notFound();return <ServicePage service={service}/>}