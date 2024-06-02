import React, { useState } from 'react'
import { useNewsContext } from '../../context/NewsContext';

const Filter = () => {
    // manually described categories and countries for filteration 
    const categories=["business","entertainment","general","health","science","sports","technology"];
    const countries = [
        { code: "in", name: "India" },
        { code: "ru", name: "Russia" },
        { code: "cn", name: "China" },
        { code: "ch", name: "Switzerland" },
        { code: "us", name: "United States" },
        { code: "fr", name: "France" },
        { code: "sa", name: "South Africa" },
        { code: "br", name: "Brazil" },
        { code: "jp", name: "Japan" },
        { code: "gb", name: "United Kingdom" }
      ];
    
    const {category,country,setCategory,setCountry}=useNewsContext();
// set category when selected 
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
      };
      // set country when selected 
      const handleCountryChange = (code) => {
        setCountry(code);
      };   
  return (
    <>
    <div className='fixed top-20 end-1 p-5 w-64 bg-primary text-black rounded-lg'>

    <div className='flex flex-col items-center'>
      <h3 className='font-bold text-xl'>Category</h3>
      <div>
        {categories.map((newCategory) => (
          <div key={newCategory} className='font-semibold'>
            <input
              type="checkbox"
              id={newCategory}
              name="category"
              value={newCategory}
              checked={category === newCategory}
              onChange={handleCategoryChange}
            />
            <label htmlFor={newCategory}>&nbsp;{newCategory}</label>
          </div>
        ))}
      </div>
     
    </div>

    <div className='flex flex-col items-center'>
      <h3 className='font-bold text-xl'>Country</h3>
      <div>
      {countries.map((newcountry,index) => (
        <div key={index} className='font-semibold'>
        <label key={newcountry.code}>
          <input
            type="checkbox"
            value={newcountry.code}
            checked={country === newcountry.code}
            onChange={() => handleCountryChange(newcountry.code)}
          />
          {newcountry.name}
        </label>
        </div>
      ))}
      </div>
     
    </div>


   
    </div>
   
    </>
    
  )
}

export default Filter