// Local-only provisioning. Never import this file into the website.
import {createInterface} from 'node:readline/promises';
import {randomBytes} from 'node:crypto';
import {createClient} from '@supabase/supabase-js';
try{process.loadEnvFile('.env')}catch{}
async function ask(label){const rl=createInterface({input:process.stdin,output:process.stdout});try{return (await rl.question(label)).trim()}finally{rl.close()}}
async function secret(label){if(!process.stdin.isTTY)throw new Error('Run this command in an interactive terminal.');process.stdout.write(label);return new Promise((resolve,reject)=>{let value='';process.stdin.setRawMode(true);process.stdin.resume();const done=()=>{process.stdin.setRawMode(false);process.stdin.off('data',read);process.stdin.pause();process.stdout.write('\n')};const read=chunk=>{for(const char of chunk.toString()){if(char==='\u0003'){done();reject(new Error('Cancelled.'));return}if(char==='\r'||char==='\n'){done();resolve(value.trim());return}if(char==='\u007f'||char==='\b')value=value.slice(0,-1);else if(char>=' ')value+=char}};process.stdin.on('data',read)})}
try{
 const url=process.env.VITE_SUPABASE_URL||await ask('Supabase project URL: ');
 if(!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url))throw new Error('Enter your https://PROJECT.supabase.co URL.');
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY||await secret('Supabase service_role / secret key (hidden, local use only): ');
 const email=await ask('Admin email [info@clickkartdigital.com]: ')||'info@clickkartdigital.com';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new Error('Enter a valid email address.');
 const password=randomBytes(18).toString('base64url')+'Aa9!';
 const admin=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
 const {data,error}=await admin.auth.admin.createUser({email,password,email_confirm:true});
 if(error)throw new Error(error.message+' No existing password was changed. For an existing user, use Supabase Auth and grant-admin.sql.');
 const {error:accessError}=await admin.from('admins').insert({user_id:data.user.id});
 console.log('\nACCOUNT CREATED');console.log('Login email:',email);console.log('Generated password:',password);
 if(accessError){console.error('Admin access was NOT granted:',accessError.message);console.error('Run schema.sql if needed, then grant-admin.sql. The account above already exists.');process.exitCode=1}
 else{console.log('Admin membership granted. Sign in at your deployed website /admin.');console.log('Save this generated password in your password manager. It is not stored in the source code.');}
}catch(error){console.error(error.message);process.exitCode=1}
