import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getAllProducts = async() =>{

    const ALL_PRODUCTS_QUERY = defineQuery(`
        *[
            _type == "product"
        ] | order(name asc)`);

        try{
        // Use Sanity fetch to send Query
            const products = await sanityFetch({
                query: ALL_PRODUCTS_QUERY,
            });
            //return list of product for empty array if not found any
        return products.data || [];
        } catch (error) {
            console.error("ERROR FETCHING PRIOCUTS", error);
            return [];
        }

}