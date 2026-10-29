'use client';
import {useEffect,useState} from 'react';
import {supabase} from './supabase';
import {posts as originals} from './data';
export function usePosts(){const [state,setState]=useState({posts:supabase?[]:originals,loading:!!supabase,error:''});useEffect(()=>{if(!supabase)return;let active=true;supabase.from('blog_posts').select('id,slug,title,excerpt,category,cover_url,created_at').eq('published',true).order('created_at',{ascending:false}).then(({data,error})=>{if(active)setState({posts:data||[],loading:false,error:error?'Articles could not be loaded. Please try again later.':''})});return()=>{active=false}},[]);return state}
