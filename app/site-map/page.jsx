import Layout from '@/components/site/Layout';
import {PageHero} from '@/components/site/Sections';
import {navigation} from '@/lib/site/data';
import pages from '@/lib/site/source-pages.json';
import Link from 'next/link';
export const metadata={title:'Site map'};
export default function Page(){return <Layout><PageHero label="Explore" title="Every page, in one place." description="Find a service, explore our agency or get in touch."/><section className="section wrap services-grid">{[...navigation,['Gallery','/gallery'],...Object.entries(pages).map(([slug,p])=>[p.title,`/${slug}`])].map(([t,url])=><Link href={url} key={url} className="text-link">{t}</Link>)}</section></Layout>}
