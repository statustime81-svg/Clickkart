'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import Layout from '../site/Layout';
import {PageHero,CTA} from '../site/Sections';
import SafeArticle from '../site/SafeArticle';
import {supabase} from '@/lib/site/supabase';
import {posts} from '@/lib/site/data';
import {articles} from '@/lib/site/articles';
export default function LiveArticlePage({slug}){const [row,setRow]=useState(null);const [loading,setLoading]=useState(true);const [error,setError]=useState('');useEffect(()=>{let active=true;setLoading(true);setError('');async function load(){if(supabase){const {data,error}=await supabase.from('blog_posts').select('*').eq('slug',slug).eq('published',true).maybeSingle();if(active){setRow(data);setError(error?'This article is temporarily unavailable.':'');setLoading(false)}}else{const p=posts.find(p=>p.slug===slug),a=articles[slug];setRow(p&&a?{...p,content_html:a.html,created_at:a.date,author:'Prem Ranjan'}:null);setLoading(false)}}load();return()=>{active=false}},[slug]);return <Layout>{loading?<section className="section wrap" role="status">Loading article…</section>:error||!row?<section className="section wrap"><h1>{error?'Unable to load article':'Article not found'}</h1><p>{error||'This article may have been removed or is not published yet.'}</p><Link className="btn" href="/blog">Back to the journal</Link></section>:<><PageHero label={row.category} title={row.title} description={row.excerpt}/><article className="section wrap plain-content">{row.cover_url&&<img className="article-cover" src={row.cover_url} alt={row.title}/>}<p>By {row.author||'Clickkart Digital'} · {new Date(row.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</p><SafeArticle html={row.content_html}/><Link className="btn btn-outline" href="/blog" style={{marginTop:30}}>All articles</Link></article><CTA/></>}</Layout>}
