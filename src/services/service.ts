// config
import {ARTICLES, IArticle, PRODUCTS, SALES} from '../config';


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

    // Add sell
    static async addSell(id: string) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: id, amountSold:1 })
        };
        const response = await fetch(SALES, requestOptions);

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

    // Buy a product
    static async buyProduct(id:string, articles: IArticle[]) {
        const sold = await ServiceEngine.addSell(id);
        if (sold.status) {
            Promise.all(articles.map((article)=>{
                const requestOptions = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({amountToSubtract: article.amountRequired })
                };
                return fetch(`${ARTICLES}/${article.id}`, requestOptions);
            })).then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error.message)
            });
        }

    }


}

export const ServiceEngine = {
    getAllProductsAndArticles: () => Service.getAllProductsAndArticles(),
    buyProduct: (id:string, articles:IArticle[]) => Service.buyProduct(id, articles),
    addSell: (id:string) => Service.addSell(id),
};
