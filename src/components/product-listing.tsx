import React, { useState, useEffect } from 'react';
// Material
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// css
import '../App.css';
// types
import {IProduct,IProductsWithArticles, PRODUCTS} from "../config";

import {ServiceEngine} from "../services/service";
import Product from "./product-component";
import ErrorBoundary from "./error-boundary";

function ProductListing() {
    const [apiResponse, setApiResponse] = useState<IProductsWithArticles | undefined>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const {getAllProductsAndArticles} = ServiceEngine;

    useEffect(() => {

        getAllProductsAndArticles().then((result:IProductsWithArticles|undefined)=> {
            if(result && !result.error) {
                setApiResponse(result);
                setErrorMessage(undefined)
            } else if (!result || result.error) {
                setErrorMessage("Something went wrong. Please, reload the page")
            }

        });
    },[]);


    return (
        <ErrorBoundary message={"can't render listing"}>
            <Box sx={{ flexGrow: 1 }}>
                {errorMessage && <div className="loading-box">{errorMessage}</div>}
                {!errorMessage && !apiResponse &&
                <Box
                    className="loading-box">
                    <div>
                    <CircularProgress size={100}/>

                    <Typography className="loading-text">
                        Loading...
                    </Typography>
                    </div>
                </Box>
                }
                <Grid container spacing={1}>
                    { apiResponse?.products.map((product: IProduct) => {
                        return (
                            <Grid key = {product.id+product.name.trim()} item xs={6}>
                                <div className="product-listing">
                                    <Product
                                        articles = {product.articles}
                                        allArticles = {apiResponse?.articles}
                                        id = {product.id}
                                        name={product.name}/>
                                </div>
                            </Grid>
                        );
                    })}

                </Grid>
            </Box>
        </ErrorBoundary>
    )



}

export default ProductListing;
