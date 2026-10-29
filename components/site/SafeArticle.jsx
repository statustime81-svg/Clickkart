'use client';
import {useEffect,useState} from 'react';
import DOMPurify from 'dompurify';
export default function SafeArticle({html}){const [clean,setClean]=useState('');useEffect(()=>{setClean(DOMPurify.sanitize(html||'',{USE_PROFILES:{html:true},FORBID_TAGS:['style','form','input','button','iframe'],FORBID_ATTR:['style']}))},[html]);return <div className="source-content" dangerouslySetInnerHTML={{__html:clean}}/>}
