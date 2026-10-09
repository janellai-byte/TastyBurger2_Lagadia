import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

function ProductList({
products,
onAddToCart,
cart,
onChangeQuantity,
onRemoveFromCart,
}) {
const [category, setCategory] = useState("All");
const [favorites, setFavorites] = useState([]);

const categories = [
"All",
...new Set(products.map((product) => product.category)),
];

const filteredProducts =
category === "All"
? products
: products.filter((product) => product.category === category);

function handleAddToCart(product) {
console.log("Add to Cart clicked:", product.name);


if (typeof onAddToCart !== "function") {
  console.error("ERROR: onAddToCart function was not received!");
  alert("Error: Hindi nakakonekta ang Add to Cart function.");
  return;
}

onAddToCart(product);


}

function toggleFavorite(id) {
setFavorites((current) =>
current.includes(id)
? current.filter((favoriteId) => favoriteId !== id)
: [...current, id]
);
}

return ( <main className="container"> <section className="hero"> <div> <p className="hero-label">FRESH • JUICY • DELICIOUS</p> <h1>Welcome to TastyBurger!</h1> <p>Discover your favorite burgers at an affordable price.</p> <a href="#menu" className="hero-button">
Explore Our Menu </a> </div> </section>


  <section id="menu" className="menu-section">
    <div className="section-heading">
      <div>
        <h2>Our Burger Menu</h2>
        <p>Choose your favorite burger.</p>
      </div>

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>

    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>

    {filteredProducts.length === 0 && (
      <p>No products found in this category.</p>
    )}
  </section>

  <Cart
    cart={cart}
    onChangeQuantity={onChangeQuantity}
    onRemove={onRemoveFromCart}
  />
</main>


);
}

export default ProductList;

