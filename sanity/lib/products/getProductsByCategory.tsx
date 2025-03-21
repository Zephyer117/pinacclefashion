import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {
  // Define the query to get products by category slug
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[
      _type == "product"
      && references(*[_type == "category" && slug.current == $categorySlug]._id)
    ] | order(name asc)
  `);

  try {
    // Fetch products using the query with the provided categorySlug
    const response = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { categorySlug },
    });

    // Ensure we return an empty array instead of null if no products are found
    return response?.data || [];  // Return empty array if no products are found
  } catch (error) {
    // Log any errors that occur during fetching
    console.error("ERROR FETCHING PRODUCTS BY CATEGORY", error);
    return [];  // Return empty array in case of error
  }
};
