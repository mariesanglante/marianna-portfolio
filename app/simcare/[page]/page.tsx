import { notFound } from 'next/navigation';
import SimcareSite, { type SimcarePage } from '../site';
const pages = ['simulations','fieldx','courses','pricing','support'];
export function generateStaticParams(){return pages.map(page=>({page}));}
export async function generateMetadata({params}:{params:Promise<{page:string}>}){const {page}=await params;return {title:`SimCare | ${page==='fieldx'?'FieldX':page==='courses'?'Course Catalog':page.charAt(0).toUpperCase()+page.slice(1)}`};}
export default async function Page({params}:{params:Promise<{page:string}>}){const {page}=await params;if(!pages.includes(page))notFound();return <SimcareSite page={page as SimcarePage}/>;}
