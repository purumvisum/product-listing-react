import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {IArticleDetails} from '../config'

export default function Article(props:IArticleDetails) {

    const {id,name, amountInStock, amountForProduct}= props;

    return (
        <ListItem component="div" disablePadding>
            <ListItemText primary={`Name: ${name} Amount: ${amountForProduct} Availiable: ${amountInStock}`} />
        </ListItem>
    );
}
