import React from "react";
import ProductList from './ProductList'

const Ofertas = () => {
    return (
        <div className="container">
            <h2>Ofertas 🔥</h2>
            <p>Descubrí descuentos en tragos seleccionados.</p>
            <ProductList category="licores" />
        </div>
    );

};
export default Ofertas;