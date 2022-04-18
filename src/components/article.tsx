import * as React from 'react';
import {IArticleDetails} from '../config'

export default function Article(props:IArticleDetails) {

    const {id,name, amountInStock, amountForProduct}= props;

    return (
            <div className="article-box">
                <div><span className="prop-title">Id:</span> <span className="prop-title">{id}</span></div>
                <div><span className="prop-title">Article:</span> <span className="prop-value">{name}</span></div>
                <div><span className="prop-title">Amount:</span> <span className="prop-value">{amountForProduct}</span></div>
                <div><span className="prop-title">Available:</span> <span className="prop-value">{amountInStock}</span></div>
            </div>
    );
}
