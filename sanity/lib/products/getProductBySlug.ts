import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async(slug: string) =>{
    const PRODUCT_BY_ID_QUERY = `
    *[
        _type == "product" && slug.current == $slug
    ] | order(name asc) [0]
`;

    try{
        const product = await sanityFetch({
            query: PRODUCT_BY_ID_QUERY,
                params:{
                    slug, //search wildcards
                },
        });
            //Return the list of products
            return product.data || null;
        } catch (error) {
            console.error("ERROR FETCHING DATA", error);
            return null;
     }
}
