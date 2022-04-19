import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import ProductListing from './components/product-listing';
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom';
import {ServiceEngine} from "./services/service";
import Product from "./components/product-component";


const products = [
    {
        "id": "a269a247-0d38-4b47-9630-79c9ae545b68",
        "name": "Dining Chair",
        "articles": [
            {
                "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
                "amountRequired": 4
            },
            {
                "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
                "amountRequired": 1
            },
            {
                "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
                "amountRequired": 8
            }
        ]
    }
];

const articles = [
    {
        "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
        "name": "Leg",
        "amountInStock": 8
    },
    {
        "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
        "name": "Screw",
        "amountInStock": 8
    },
    {
        "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
        "name": "Seat",
        "amountInStock": 2
    },
    {
        "id": "6892b98b-9b87-4520-9a9e-7528f1d78cb4",
        "name": "Table Top",
        "amountInStock": 1
    }
];

ServiceEngine.getAllProductsAndArticles = ()=> Promise.resolve({products, articles, error: false})

test('renders error message', () => {

    const setApiResponse = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    const mockState ={
        errorMessage: 'Something went wrong. Please, reload the page'
    }

    useStateSpy.mockImplementation(() => [{...mockState}, setApiResponse]);

    act(() => {
        render(<ProductListing />);
    });
    const linkElement = screen.getByText(/Something went wrong. Please, reload the page/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders product listing', () => {

    const setApiResponse = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    const mockState ={
        products,
        articles,
        error: false
    }

    useStateSpy.mockImplementation(() => [{...mockState}, setApiResponse]);

    act(() => {
        render(<ProductListing />);
    });
    const linkElement = screen.getByText(/Dining Chair/i);
    expect(linkElement).toBeInTheDocument();
});


test('renders correct available amount 1', () => {

    const setApiResponse = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    const mockState ={
        products,
        articles,
        error: false
    }

    useStateSpy.mockImplementation(() => [{...mockState}, setApiResponse]);


    act(() => {
        render(<ProductListing />);
    });

    const availableAmount = document.querySelectorAll('.MuiChip-root')[0].textContent

    expect(document.querySelectorAll('.MuiChip-root').length).toBe(1)
    expect(availableAmount).toBe("1")
});

test('renders correct available amount 4', () => {

    const productsMore = [
        {
            "id": "a269a247-0d38-4b47-9630-79c9ae545b68",
            "name": "Dining Chair",
            "articles": [
                {
                    "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
                    "amountRequired": 1
                },
                {
                    "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
                    "amountRequired": 1
                },
                {
                    "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
                    "amountRequired": 1
                }
            ]
        }
    ];

    const articlesMore = [
        {
            "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
            "name": "Leg",
            "amountInStock": 8
        },
        {
            "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
            "name": "Screw",
            "amountInStock": 8
        },
        {
            "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
            "name": "Seat",
            "amountInStock": 4
        },
        {
            "id": "6892b98b-9b87-4520-9a9e-7528f1d78cb4",
            "name": "Table Top",
            "amountInStock": 4
        }
    ];


    const setApiResponse = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    const mockState ={
        products: productsMore,
        articles: articlesMore,
        error: false
    }

    useStateSpy.mockImplementation(() => [{...mockState}, setApiResponse]);


    act(() => {
        render(<ProductListing />);
    });

    const availableAmount = document.querySelectorAll('.MuiChip-root')[0].textContent

    expect(document.querySelectorAll('.MuiChip-root').length).toBe(1)
    expect(availableAmount).toBe("4")
});


test('press buy button', () => {

    const buyProduct = jest.fn()

    const setApiResponse = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    const mockState ={
        products,
        articles,
        error: false
    }

    useStateSpy.mockImplementation(() => [{...mockState}, setApiResponse]);


    act(() => {
        render(<Product
            id={"a269a247-0d38-4b47-9630-79c9ae545b68"}
            name = {"Dining Chair"}
            articles = {products[0].articles}
            allArticles = {articles}
            buyProduct = {buyProduct}
        />);
    });

    const button = document.querySelectorAll('.MuiButton-root');

    expect(button.length).toBe(1)

    fireEvent.click(button[0])
    expect(buyProduct).toHaveBeenCalledTimes(1)
});
