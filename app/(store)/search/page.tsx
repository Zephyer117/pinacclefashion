import ProductGrid from '@/components/ProductGrid';
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName';
import React from 'react'

async function searchPage({ searchParams,
}:{ searchParams: Promise<{ query: string }>}) {

    const {query} = await searchParams;
    const products = await searchProductsByName(query); //create a {searchProductsByName.ts in the sanity lib {products} Foler}
    
    if(!products?.length){
        return(
            <div className='flex flex-col items-center justify-top bg-gray-200 py-4'>
              <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-4xl'>
              <h1 className='text-3xl font-bold mb-6 text-center'>
                No Products Found: {query}
              </h1>
              <p className='text-gray-700 text-center'>
                Try Search With Keywords
              </p>
              </div>  
            </div>
        )
    }
    return (
        <div className='flex flex-col items-center justify-top min-h-screen bg-gray-300 p-4'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-4xl'>
                <h1 className='text-3xl font-bold mb-6 text-center'>Search Results for {query}</h1>
                <ProductGrid products={products}/>
            </div>
        </div>
  )
}

export default searchPage