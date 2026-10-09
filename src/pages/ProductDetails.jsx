import { Link, useParams } from "react-router-dom";

function ProductDetails({ products, onAddToCart }) {
const { id } = useParams();
const product = products.find((item) => item.id === Number(id));

if (!product) {
return ( <main className="container"> <h2>Product not found.</h2> <Link to="/">Back to Menu</Link> </main>
);
}

return ( <main className="container details-page"> <Link to="/" className="back-link">← Back to Menu</Link>


  <section className="details-card">
    <img src={product.image} alt={product.name} />

    <div>
      <span className="category">{product.category}</span>
      <h1>{product.name}</h1>
      <p className="rating">⭐ {product.rating} / 5</p>
      <h2>₱{product.price.toLocaleString("en-PH")}</h2>
      <p>{product.description}</p>
      <p><strong>Specifications:</strong> {product.specification || "Not specified"}</p>
      <p><strong>Available Stock:</strong> {product.quantity}</p>

      <button
        disabled={product.quantity <= 0}
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  </section>
</main>


);
}

export default ProductDetails;
