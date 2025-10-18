
function ProductCard({ trago, precio }) {
  return (
    <div className="card">
      <img src={trago.strDrinkThumb} alt={trago.strDrink} />
      <h3>{trago.strDrink}</h3>
      <p>{trago.strCategory}</p>
      <p>Precio: ${precio}</p>
      <button>Añadir al carrito</button>
    </div>
  );
}

export default ProductCard;