export const LOCAL_ENV = "http://localhost:7000/";

export const PRODUCTS = `${LOCAL_ENV}products/`;
export const ARTICLES = `${LOCAL_ENV}articles/`;
export const SALES = `${LOCAL_ENV}sales/`;

// Types

export interface IArticle {
    id: string;
    amountRequired: number;
}

export interface IProduct {
    articles: IArticle[];
    id: string;
    name: string
}

export interface IProductListing {
    articles?: IArticle[];
    id: string;
    name: string,
    allArticles: IArticleDetails[];
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    buyProduct: any;
}

export interface IProductsWithArticles {
    products: IProduct[] | [];
    articles: IArticleDetails[] | [];
    error?: boolean;
    errorMessage?: string | undefined;
}


export interface IArticleDetails {
    id: string;
    name: string;
    amountInStock: number;
    amountForProduct?: number;
}


