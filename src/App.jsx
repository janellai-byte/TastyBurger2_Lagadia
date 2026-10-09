import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import initialProducts from "./data/products";
import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";

function App() {
const [products, setProducts] = useState(initialProducts);
const [cart, setCart] = useState([]);

// Add a new product
function addProduct(newProduct) {
setProducts((currentProducts) => [
...currentProducts,
newProduct,
]);
}

// Add a burger to the cart
function addToCart(product) {
if (!product || product.id == null) {
alert("Unable to add this product to the cart.");
return;
}


setCart((currentCart) => {
  const existingItem = currentCart.find(
    (item) => String(item.id) === String(product.id)
  );

  if (existingItem) {
    return currentCart.map((item) =>
      String(item.id) === String(product.id)
        ? {
            ...item,
            cartQuantity: item.cartQuantity + 1,
          }
        : item
    );
  }

  return [
    ...currentCart,
    {
      ...product,
      cartQuantity: 1,
    },
  ];
});


}

// Change quantity in the cart
function changeQuantity(id, amount) {
setCart((currentCart) =>
currentCart
.map((item) =>
String(item.id) === String(id)
? {
...item,
cartQuantity: item.cartQuantity + amount,
}
: item
)
.filter((item) => item.cartQuantity > 0)
);
}

// Remove a burger from the cart
function removeFromCart(id) {
setCart((currentCart) =>
currentCart.filter(
(item) => String(item.id) !== String(id)
)
);
}

// Total number of items in the cart
const cartCount = cart.reduce(
(total, item) => total + item.cartQuantity,
0
);

return (
<> <Header cartCount={cartCount} />


  <Routes>
    <Route
      path="/"
      element={
        <ProductList
          products={products}
          onAddToCart={addToCart}
          cart={cart}
          onChangeQuantity={changeQuantity}
          onRemoveFromCart={removeFromCart}
        />
      }
    />

    <Route
      path="/add-product"
      element={
        <AddProduct onAddProduct={addProduct} />
      }
    />

    <Route
      path="/product/:id"
      element={
        <ProductDetails
          products={products}
          onAddToCart={addToCart}
        />
      }
    />
  </Routes>

  <footer className="footer">
    <p>© 2026 TastyBurger | Product Management App</p>
  </footer>
</>


);
}

export default App;

