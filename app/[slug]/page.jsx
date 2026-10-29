import {notFound,redirect} from 'next/navigation';
import SourcePage from '@/components/pages/SourcePage';
import pages from '@/lib/site/source-pages.json';
import {articles} from '@/lib/site/articles';
export async function generateMetadata({params}){const {slug}=await params;return {title:pages[slug]?.title||'Clickkart Digital'}}
export default async function Page({params}){const {slug}=await params;if(slug==='mobile-app'||slug==='software')redirect(`/solutions/${slug}`);if(articles[slug])redirect(`/blog/${slug}`);if(slug==='home-v1')redirect('/');if(slug==='enquiry-form')redirect('/contact-us');if(!pages[slug])notFound();return <SourcePage page={pages[slug]}/>}
