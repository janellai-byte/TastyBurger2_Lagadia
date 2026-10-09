import { Link } from "react-router-dom";

function Header({ cartCount }) {
return ( <header className="header"> <Link to="/" className="brand">
🍔 TastyBurger </Link>


  <nav>
    <Link to="/">Our Menu</Link>
    <Link to="/add-product">Add Product</Link>
    <a href="/#cart">Cart ({cartCount})</a>
  </nav>
</header>

);
}

export default Header;
