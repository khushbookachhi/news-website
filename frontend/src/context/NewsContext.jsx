import { createContext, useContext, useState } from "react";


export const NewsContext=createContext();

export const useNewsContext=()=>{
    return useContext(NewsContext);
}

export const NewsContextProvider=({children})=>{
    const [country,setCountry]=useState("us");
    const [category,setCategory]=useState("general");
    const [q,setQ]=useState("");
    const [sources,setSources]=useState(null);
    const [news,setNews]=useState(null);
    return <NewsContext.Provider value={{news,setNews,country,setCountry,category,setCategory,q,setQ}}>
     {children}
    </NewsContext.Provider>
}