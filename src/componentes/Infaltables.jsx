import React from "react";
import ProductList from './ProductList'

const Infaltables =()=>{
    return(
        <div className="container">
            <h1>Infaltables</h1>
            <ProductList category="ron"/>
            <ProductList category="vodka"/>
            <ProductList category="gin"/>
            <ProductList category="tequila"/>
        </div>
    );

};
export default Infaltables;