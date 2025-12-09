import React from "react";
import ProductList from './TankList'

const Home = () => {
    return (
        <div className="container">
            <h2>Bienvenido a la Galería de Tanques</h2>
            <p className="home-text">
                Bienvenido a la galería de blindados. Esta aplicación reúne tanques
  ligeros, medios, pesados y cazatanques de distintas naciones,
  organizados por tier y categoría.  
  Vas a poder explorar vehículos icónicos, conocer sus características,
  comprender su rol estratégico y compararlos según su estilo de juego
  dentro del campo de batalla.  La recomendacion es que se explore la galería de tanques para ver los tanques que mas le llamen la atencion, al final va a ser mas divertido y entretenido jugar lo que le gusta!!!
            </p>
            
            <div className="video-container">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/mWI-ltfKenw"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
 
        </div>
    );

};
export default Home;