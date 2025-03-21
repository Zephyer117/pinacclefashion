import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const searchProductsByName = async (searchParam: string) =>{
    const PRODUCT_SEARCH_QUERY = defineQuery(`   //define the query
        *[
            _type == "product"
            && name match $searchParam //grokquery fetching methods
        ] | order(name asc)
        `);
        try{
            const products = await sanityFetch({
                query: PRODUCT_SEARCH_QUERY,
                params:{
                    searchParam: `${searchParam}*`, //search wildcards
            },
            });
            //Return the list of products
            return products.data||[];
        } catch (error) {
            console.error("ERROR FETCHING DATA", error);
            return null;
    }
};