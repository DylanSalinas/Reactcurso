

function ProductCard({ trago }) {
  return (
    <div className="card">
      <img src={trago.strDrinkThumb} alt={trago.strDrink} />
      <h3>{trago.strDrink}</h3>
      <p>{trago.strCategory}</p>
    </div>
  );
}

export default ProductCard;