function Cart({ cart = [], onChangeQuantity, onRemove }) {
const totalItems = cart.reduce(
(total, item) => total + Number(item.cartQuantity || 0),
0
);

const totalPrice = cart.reduce(
(total, item) =>
total + Number(item.price || 0) * Number(item.cartQuantity || 0),
0
);

return ( <section className="cart" id="cart"> <h2>🛒 Shopping Cart ({totalItems})</h2>


  {cart.length === 0 ? (
    <p>Your cart is empty. Click Add to Cart to order a burger!</p>
  ) : (
    <>
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="cart-item-info">
            <strong>{item.name}</strong>

            <p>
              Price: ₱
              {Number(item.price).toLocaleString("en-PH")}
            </p>

            <p>Quantity: {item.cartQuantity}</p>

            <p>
              Subtotal: ₱
              {(
                Number(item.price) * item.cartQuantity
              ).toLocaleString("en-PH")}
            </p>
          </div>

          <div className="cart-controls">
            <button
              type="button"
              onClick={() => onChangeQuantity(item.id, -1)}
            >
              −
            </button>

            <span>{item.cartQuantity}</span>

            <button
              type="button"
              onClick={() => onChangeQuantity(item.id, 1)}
            >
              +
            </button>

            <button
              type="button"
              className="remove-button"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3>Total: ₱{totalPrice.toLocaleString("en-PH")}</h3>
    </>
  )}
</section>


);
}

export default Cart;


