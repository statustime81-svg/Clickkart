import Layout from '@/components/site/Layout';
import Link from 'next/link';
export default function NotFound(){return <Layout><section className="section wrap"><div className="eyebrow">404</div><h1 style={{fontSize:60,margin:'25px 0'}}>This page took a different turn.</h1><p>Let’s get you back to Clickkart.</p><Link className="btn" href="/" style={{marginTop:30}}>Back to home</Link></section></Layout>}
