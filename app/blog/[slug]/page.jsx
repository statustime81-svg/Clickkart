import LiveArticlePage from '@/components/pages/LiveArticlePage';
import {posts} from '@/lib/site/data';
export async function generateMetadata({params}){const {slug}=await params;return {title:posts.find(p=>p.slug===slug)?.title||'Clickkart journal'}}
export default async function Page({params}){const {slug}=await params;return <LiveArticlePage slug={slug}/>}
