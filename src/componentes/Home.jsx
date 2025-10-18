import React from "react";
import ProductList from './ProductList'

const Home = () => {
    return (
        <div className="container">
            <h2>Bienvenido a la Galería de Tragos 🍸</h2>
            <p>Explorá nuestras ofertas e infaltables.</p>
            <ProductList />
        </div>
    );

};
export default Home;