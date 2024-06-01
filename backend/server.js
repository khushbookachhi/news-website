import express from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
const cache=new NodeCache();
const apiUrl="https://newsapi.org/v2/top-headlines?apiKey=e663e6528ba141ee8b4349fa99723329";
const everyThingUrl="https://newsapi.org/v2/everything?pageSize=40&from=2024-05-01&apiKey=e663e6528ba141ee8b4349fa99723329"
const app = express();
const port=4000;


async function handleApiResponse(res, apiUrlWithParams){
    try {
        const cacheKey = apiUrlWithParams;
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            console.log('Using cached data');
            return res.status(200).json(cachedData);
        }
        console.log("getting news is running ");
        const response = await axios.get(apiUrlWithParams);
        cache.set(cacheKey, response.data, 600);
    
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
   
}
app.get(`/newsFilter`,async(req,res)=>{
try {
    const { country, category, q } = req.query;
    let apiUrlWithParams = apiUrl;
    if (country) {
        apiUrlWithParams += `&country=${country}`;
    }
    if (category) {
        apiUrlWithParams += `&category=${category}`;
    }
    if (q) {
        apiUrlWithParams += `&q=${encodeURIComponent(q)}`;
    }
    console.log("news filter is running");
    await handleApiResponse(res,apiUrlWithParams);
} catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
}
})

app.get('/newsSources',async(req,res)=>{
    try {
        const { sources } = req.query;
        let apiUrlWithParams = apiUrl;
        if (sources) {
            apiUrlWithParams += `&sources=${sources}`;
        }
        console.log("news sources is running");
        await handleApiResponse(res,apiUrlWithParams);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
})

app.get(`/newsEverything`,async(req,res)=>{
    try {
        const { q,sortBy} = req.query;
        let apiUrlWithParams = everyThingUrl;
        if (q) {
            apiUrlWithParams += `&q=${encodeURIComponent(q)}`;
        }
        if(sortBy){
            apiUrlWithParams+=`&sortBy=${sortBy}`;
        }
        console.log("news everything is running");
       await handleApiResponse(res,apiUrlWithParams);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
    })

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });


  