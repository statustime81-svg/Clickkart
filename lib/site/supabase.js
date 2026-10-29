import {createClient} from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isConfigured=Boolean(url&&key);
export const supabase=isConfigured?createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;
export async function uploadImage(file,folder){if(!supabase)throw new Error('Supabase is not configured.');if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('Choose a JPG, PNG or WebP image.');if(file.size>5*1024*1024)throw new Error('Images must be smaller than 5 MB.');const ext=file.type.split('/')[1];const path=`${folder}/${crypto.randomUUID()}.${ext}`;const {error}=await supabase.storage.from('site-images').upload(path,file,{cacheControl:'3600',upsert:false});if(error)throw error;return {url:supabase.storage.from('site-images').getPublicUrl(path).data.publicUrl,path};}
