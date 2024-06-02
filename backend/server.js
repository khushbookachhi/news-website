import express from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
dotenv.config();
const cache=new NodeCache();
const apiKey=process.env.api_key;

const apiUrl=`https://newsapi.org/v2/top-headlines?apikey=${apiKey}`;

const app = express();
const port=4000;

//asynchronus function to catch data or if not catched fetch using API 
async function handleApiResponse(res, apiUrlWithParams){
    try {
         // Create a cache key using the API URL with parameters
        const cacheKey = apiUrlWithParams;
         // Check if the data is already cached
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            console.log('Using cached data');
             // Return the cached data if found
            return res.status(200).json(cachedData);
        }
        console.log("getting news is running ");
          // Fetch data from the API if not cached
        const response = await axios.get(apiUrlWithParams);
        cache.set(cacheKey, response.data, 600);
    
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
   
}

// Route handler for '/api/newsFilter' endpoint (async function for handling asynchronous operations)
app.get(`/api/newsFilter`,async(req,res)=>{
try {
    const { country, category, q } = req.query;
    let apiUrlWithParams = apiUrl;
    //appending param if not null
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




app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });


  