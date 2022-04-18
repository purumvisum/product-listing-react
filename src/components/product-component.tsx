import * as React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import Article from "./article";

import {IArticle, IArticleDetails, IMAGE300, IProductListing, IProductsWithArticles} from '../config'
import {useState} from "react";
import {useEffect} from "react";

export default function Product(props:IProductListing ) {

    const [amount, setAmount] = useState<number>(0);

    const {articles, id, name, allArticles}= props;

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
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="194"
                image={IMAGE300}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Chip label={amount} />
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
                                />
                            )
                        }

                    })
                }
            </CardContent>
            <CardActions>
                <Button size="small">Buy</Button>
            </CardActions>
        </Card>
    );
}
