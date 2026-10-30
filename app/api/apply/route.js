import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';
import { JOBS } from '../../../lib/jobs';
import { getJob } from '../../../lib/careers-jobs';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const attempts=new Map();
function clean(value,max){return String(value||'').replace(/\0/g,'').trim().slice(0,max);}
export async function POST(request){
 const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'; const now=Date.now(); const recent=(attempts.get(ip)||[]).filter(t=>now-t<10*60*1000); if(recent.length>=5)return NextResponse.json({error:'Too many applications from this connection. Please try again later.'},{status:429});
 let form; try { form=await request.formData(); } catch { return NextResponse.json({error:'Please submit the application form again.'},{status:400}); }
 if(clean(form.get('website'),500)) return NextResponse.json({error:'We could not submit your application. Please try again.'},{status:400});
 if(form.get('consent') !== 'yes') return NextResponse.json({error:'Please confirm that we may store your details to process this application.'},{status:400});
 const job=JOBS.find(j=>j.slug===clean(form.get('jobSlug'),160) || j.slug===clean(form.get('slug'),160));
 // The form must identify its job explicitly.
 const slugField=clean(form.get('jobSlug'),160);
 const jobBySlug=await getJob(slugField);
 if(!jobBySlug || !jobBySlug.open) return NextResponse.json({error:'This position is not accepting applications.'},{status:400});
 const name=clean(form.get('name'),120),email=clean(form.get('email'),160),phone=clean(form.get('phone'),40),city=clean(form.get('city'),80),experience=clean(form.get('experience'),20),licenceStatus=clean(form.get('licenceStatus'),80),currentPosition=clean(form.get('currentPosition'),160),linkedin=clean(form.get('linkedin'),300),coverNote=clean(form.get('coverNote'),1500);
 if(!name||!email||!phone||!city||!experience||!licenceStatus||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({error:'Please check your name, email, phone, city, experience and licence status.'},{status:400});
 const allowedExperience=['0-1','1-3','3-5','5+'],allowedLicence=['Licensed advocate','High Court enrolled','Pending','Not yet']; if(!allowedExperience.includes(experience)||!allowedLicence.includes(licenceStatus)) return NextResponse.json({error:'Please choose valid experience and licence options.'},{status:400});
 const cv=form.get('cv'); if(!cv || typeof cv.name !== 'string') return NextResponse.json({error:'Please attach your CV.'},{status:400}); const filename=cv.name.replace(/[\r\n]/g,''); const ext=filename.toLowerCase().split('.').pop(); const mime=String(cv.type||'').toLowerCase(); const allowed={pdf:'application/pdf',doc:'application/msword',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}; if(!allowed[ext] || mime!==allowed[ext]) return NextResponse.json({error:'Please attach a PDF, DOC or DOCX CV.'},{status:400}); if(cv.size>2*1024*1024) return NextResponse.json({error:'Your CV must be 2 MB or smaller.'},{status:400});
 const bytes=Buffer.from(await cv.arrayBuffer()); if(!bytes.length) return NextResponse.json({error:'The CV file is empty. Please choose another file.'},{status:400}); recent.push(now); attempts.set(ip,recent);
 await pool.query(`INSERT INTO job_applications (job_slug,job_title,name,email,phone,city,experience,licence_status,current_position,linkedin,cover_note,cv_filename,cv_mime,cv_data) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,[jobBySlug.slug,jobBySlug.title,name,email,phone,city,experience,licenceStatus,currentPosition||null,linkedin||null,coverNote||null,filename,mime,bytes]);
 return NextResponse.json({ok:true});
}
