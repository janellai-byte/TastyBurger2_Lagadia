import { Link } from "react-router-dom";

function ProductCard({
product,
onAddToCart,
isFavorite,
onToggleFavorite,
}) {
function handleAddToCart() {
console.log("Add to Cart clicked:", product.name, product.id);


if (typeof onAddToCart !== "function") {
  console.error("ERROR: onAddToCart is not a function.");
  alert("Add to Cart error. Please check ProductList.jsx.");
  return;
}

onAddToCart(product);


}

return ( <article className="product-card"> <img
     src={product.image}
     alt={product.name}
     className="product-image"
   />


  <div className="product-info">
    <span className="category">{product.category}</span>

    <h3>{product.name}</h3>

    <p className="rating">⭐ {product.rating}</p>

    <p>{product.description}</p>

    <p className={Number(product.quantity) < 5 ? "low-stock" : "stock"}>
      Stock: {product.quantity}
    </p>

    <p className="inventory-value">
      Inventory Value: ₱
      {(Number(product.price) * Number(product.quantity)).toLocaleString("en-PH")}
    </p>

    <h2>₱{Number(product.price).toLocaleString("en-PH")}</h2>

    <div className="product-actions">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={Number(product.quantity) <= 0}
      >
        Add to Cart
      </button>

      <Link
        to={`/product/${product.id}`}
        className="details-button"
      >
        View Details
      </Link>

      <button
        type="button"
        className="favorite-button"
        onClick={() => onToggleFavorite(product.id)}
        aria-label="Toggle favorite"
      >
        {isFavorite ? "❤️" : "♡"}
      </button>
    </div>
  </div>
</article>


);
}

export default ProductCard;

