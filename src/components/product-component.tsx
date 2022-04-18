import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import Article from "./article";

// css
import '../App.css';

import {IArticle, IArticleDetails, IProductListing} from '../config'
import {useState} from "react";
import {useEffect} from "react";

export default function Product(props:IProductListing ) {

    const [amount, setAmount] = useState<number>(0);

    const {articles, id, name, allArticles, buyProduct}= props;

    useEffect(() => {
        if(articles) {
            // how much articles are enough in the stock for this product (array)
            const getAvailiableAmount = articles.map((article: IArticle) => {
                const articleDetail = allArticles.find((articleDetails: IArticleDetails) => {
                    return articleDetails.id === article.id;
                });

                if (articleDetail) {
                    const enoughForNumber = (articleDetail.amountInStock / article.amountRequired);
                    return Math.floor(enoughForNumber);
                }

                return 0;
            });
            // find the lowest number in the array
            setAmount(Math.min(...getAvailiableAmount));
        }
    },[]);




    return (
        <Card>
            <CardContent>
                <div className="product-info">
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Chip className="product-amount" label={amount} />
                </div>
                <div><span className="prop-title">Product Id:</span> <span className="prop-title">{id}</span></div>

                <br/>
                {
                    // Find articles for the current product
                    articles?.map((article:IArticle)=>{
                        const articleForProduct = allArticles.find((articleDetails: IArticleDetails) => {
                            return articleDetails.id === article.id;
                        });
                        if (articleForProduct) {
                            return (
                                <Article
                                    id={articleForProduct.id}
                                    name={articleForProduct.name}
                                    amountForProduct = {article.amountRequired}
                                    amountInStock={articleForProduct.amountInStock}
                                    key={articleForProduct.id}
                                />
                            )
                        }

                    })
                }
            </CardContent>
            <CardActions>
                <Button
                    disabled = {!amount}
                    variant="contained"
                    onClick={buyProduct}
                    size="small">Buy</Button>
            </CardActions>
        </Card>
    );
}
