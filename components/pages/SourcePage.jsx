import Layout from '../site/Layout';
import {PageHero,CTA} from '../site/Sections';
import Link from 'next/link';
export default function SourcePage({page}){return <Layout><PageHero label="Clickkart Digital" title={page.title} description="Explore the details, then talk to our team about the right solution for your business."/><section className="section wrap plain-content source-content"><div dangerouslySetInnerHTML={{__html:page.html}}/><Link className="btn" href={`/contact-us?service=${encodeURIComponent(page.title)}`} style={{marginTop:35}}>Discuss this with us</Link></section><CTA/></Layout>}
