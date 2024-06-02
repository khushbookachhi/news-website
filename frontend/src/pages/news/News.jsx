import React, { useEffect, useState } from 'react'
import { useNewsContext } from '../../context/NewsContext.jsx';
import useGetNews from '../../hooks/useGetNews';
import newsImg from '../../assets/NewsDigest_logo.jpg';
import Filter from '../filter/Filter.jsx';
const News = () => {
    
     const {loading}=useGetNews();
    const {news}=useNewsContext(); 
    // update new whenever fetched new data 
useEffect(()=>{
console.log(news);
},[news])

    return (
        <>
        <div className='flex flex-col items-center relative p-3 pt-12'>
        {loading && <span className="loading loading-spinner loading-lg mt-40 text-neutral"></span>}
        </div>
        
         <div className='flex relative p-3 pt-4 '>
        
         {/* news list  */}
        <div className='flex flex-wrap gap-5 p-4 pt-0 w-9/12 text-black'>
       
        {!loading && news && news.length>0 && news.map((article,index)=>{

   return    <div className="card card-compact w-72 bg-slate-50 shadow-xl" key={index}>
   <figure><img className='w-72 h-44' 
   src={article.urlToImage?article.urlToImage:newsImg} alt="newsImage"/></figure>
   <div className="card-body">
     <h2 className="card-title">{article.title && article.title.split(/\s+/).slice(0,6).join(' ')}...</h2>
     <p className='flex flex-wrap text-left pb-0'>{article.description &&article.description.split(/\s+/).slice(0,18).join(' ')}...</p>
     <p className='pt-0 font-bold text-slate-800'><span className='font-semibold text-base'>Source:-</span> {article.source.name}</p>
     <p className='pt-0'><span className='font-semibold text-base'>PublishedAt:-</span> {article.publishedAt.substring(0,10)}</p>
     <div className="card-actions justify-end">
    
         <a className="btn btn-primary rounded-3xl text-base p-2" href={article.url} target='_blank'>Read</a>
     
     </div>
   </div>
 </div>
  })}

        </div>
         {/* filters  */}
        {!loading && <Filter/>} 

    </div>
        </>
   
  )
}

export default News