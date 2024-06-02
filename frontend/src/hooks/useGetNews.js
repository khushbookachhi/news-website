import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNewsContext } from '../context/NewsContext.jsx';
const useGetNews = () => {
    const [loading,setLoading]=useState(false);
    const {country,category,q,setNews}=useNewsContext();
    

        useEffect(()=>{
            console.log(country);
            console.log(category);
            const getNewsAsync=async()=>{
                setLoading(true);
                try {
                    const res=await axios.get("/api/newsFilter",{
                        params:{country,category}
                    })
                   
                    const data=await res.data.articles;
                    if(data.error){
                        throw new Error(data.error);
                    }
                   
                   setNews(data);
                } catch (error) {
                    toast.error(error.message);
                }finally{
                    setLoading(false);
                }
            }
            getNewsAsync();
            },[country,category,q,setNews])

            return {loading}
    }



export default useGetNews