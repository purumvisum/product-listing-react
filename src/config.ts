export const LOCAL_ENV = "http://localhost:7000/";
export const IMAGE300 = "https://via.placeholder.com/300.webp/";

export const PRODUCTS = `${LOCAL_ENV}products/`;
export const ARTICLES = `${LOCAL_ENV}articles/`;

// Types

export interface IArticle {
    id: string;
    amountRequired: number;
}

export interface IProduct {
    articles?: IArticle[];
    id: string;
    name: string
}

export interface IProductListing {
    articles?: IArticle[];
    id: string;
    name: string,
    allArticles: IArticleDetails[];
}

export interface IProductsWithArticles {
    products: IProduct[];
    articles: IArticleDetails[];
    error?: boolean;
}


export interface IArticleDetails {
    id: string;
    name: string;
    amountInStock: number;
    amountForProduct: number;
}


