import React from "react";
import ProductList from './ProductList'

const Infaltables = () => {
    return (
        <div className="container">
            <h2>Infaltables 🍹</h2>
            <p>Los tragos que no pueden faltar en tu colección.</p>
            <ProductList category="ron" />
            <ProductList category="vodka" />
            <ProductList category="gin" />
            <ProductList category="tequila" />
        </div>
    );

};
export default Infaltables;