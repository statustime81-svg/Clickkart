import Link from 'next/link';
import Layout from '../site/Layout';
import {PageHero,CTA} from '../site/Sections';
export default function ArticlePage({post,article}){return <Layout><PageHero label={`${post.category} · ${article.date}`} title={post.title} description={post.excerpt}/><article className="section wrap plain-content"><p>By Prem Ranjan · Clickkart Digital</p><div className="source-content" dangerouslySetInnerHTML={{__html:article.html}}/><p style={{marginTop:40}}><a className="text-link" href={article.source} target="_blank" rel="noreferrer">Read the original article</a></p><Link href="/blog" className="btn btn-outline" style={{marginTop:25}}>All articles</Link></article><CTA/></Layout>}
