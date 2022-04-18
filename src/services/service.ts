// config
import {ARTICLES, PRODUCTS} from '../config';


class Service {

    // ex PRODUCT, ARTICLE retur all PRODUCT or ARTICLES
    static async getAll(type: string) {
        const response = await fetch(type);
        const jsonResponse = await response.json();
        return {
            status: response.ok,
            response: JSON.parse(JSON.stringify(jsonResponse))
        }
    }

    // get all products and articles
    static async getAllProductsAndArticles() {
        const products = await Service.getAll(PRODUCTS);
        const articles = await Service.getAll(ARTICLES);
        const result = {products: [], articles: []}
        if (products.status && articles.status) {
            return {
                products: products.response,
                articles: articles.response,
                error: false
            }
        } else if (!products.status || !articles.status) {
            return {
                products: [],
                articles: [],
                error: true,
            }
        }


    }


}

export const ServiceEngine = {
    getAll: (type:string) => Service.getAll(type),
    getAllProductsAndArticles: () => Service.getAllProductsAndArticles(),
};
