import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct({ onAddProduct }) {
const navigate = useNavigate();

const [form, setForm] = useState({
name: "",
category: "Beef Burger",
price: "",
quantity: "",
image: "",
description: "",
specification: "",
rating: "5",
});

const [error, setError] = useState("");

function handleChange(event) {
const { name, value } = event.target;
setForm((current) => ({ ...current, [name]: value }));
}

function handleSubmit(event) {
event.preventDefault();


if (
  !form.name.trim() ||
  !form.price ||
  form.quantity === "" ||
  !form.description.trim()
) {
  setError("Please fill in all required fields.");
  return;
}

if (
  !Number.isFinite(Number(form.price)) ||
  Number(form.price) <= 0 ||
  !Number.isInteger(Number(form.quantity)) ||
  Number(form.quantity) < 0
) {
  setError("Enter a valid price and a non-negative whole stock quantity.");
  return;
}

const newProduct = {
  ...form,
  id: Date.now(),
  name: form.name.trim(),
  price: Number(form.price),
  quantity: Number(form.quantity),
  rating: Number(form.rating),
  image:
    form.image.trim() ||
    "https://placehold.co/600x400?text=TastyBurger",
};

onAddProduct(newProduct);
navigate("/");


}

return ( <main className="container form-container"> <h1>Add New Product</h1> <p>Add a new burger to your product inventory.</p>


  <form className="product-form" onSubmit={handleSubmit}>
    <label>Product Name *</label>
    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="e.g. Spicy Chicken Burger"
      required
    />

    <label>Category *</label>
    <select
      name="category"
      value={form.category}
      onChange={handleChange}
    >
      <option>Beef Burger</option>
      <option>Cheese Burger</option>
      <option>Chicken Burger</option>
      <option>Vegetarian Burger</option>
    </select>

    <div className="form-row">
      <div>
        <label>Price (₱) *</label>
        <input
          name="price"
          type="number"
          min="0.01"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Stock Quantity *</label>
        <input
          name="quantity"
          type="number"
          min="0"
          step="1"
          value={form.quantity}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <label>Image URL</label>
    <input
      name="image"
      type="url"
      value={form.image}
      onChange={handleChange}
      placeholder="https://example.com/burger.jpg"
    />

    <label>Description *</label>
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      required
      placeholder="Describe your burger..."
    />

    <label>Specifications</label>
    <textarea
      name="specification"
      value={form.specification}
      onChange={handleChange}
      placeholder="Ingredients and other details..."
    />

    <label>Rating</label>
    <select
      name="rating"
      value={form.rating}
      onChange={handleChange}
    >
      <option value="5">5 stars</option>
      <option value="4">4 stars</option>
      <option value="3">3 stars</option>
      <option value="2">2 stars</option>
      <option value="1">1 star</option>
    </select>

    {error && <p className="error-message">{error}</p>}

    <button type="submit">Save Product</button>
  </form>
</main>


);
}

export default AddProduct;
