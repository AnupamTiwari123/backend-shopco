
import { Link } from "react-router-dom"
import "./Navbar.css"
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu"

function Navbar() {

  return (
    <>
      <div className="offer">Sign up and get 20% off on you first order <Link to={"/register"}>Sign up</Link ></div>
      <nav>
        <div className="menu-icon">

          <HamburgerMenu />
        </div>
        <div className='brand-name'>
          <Link to={"/"}><h1>SHOP.CO</h1></Link>
        </div>
        <div className='links'>
          <ul>
            <Link to={"/newarrivals"}> <li>New Arrivals</li></Link>
            <Link to={"/products"}><li>All Product</li></Link>
            <Link to={"/products/Men's%20Clothing"}><li>Mens</li></Link>
            <Link to={"/products/Women's%20Clothing"}><li>Womens</li></Link>
            <Link to={"/products/Kids' Clothing"}><li>Kids</li></Link>
            <Link to={"/products/Electronics"}><li>Electronics</li></Link>
          </ul>
        </div>
        <div className='search'>
          <form>
            <span><input type="search" placeholder='search for products...' /></span>

          </form>

        </div>
        <div className='icons'>
          <Link to={"/cart"}><p><i className="fa-solid fa-cart-shopping"></i></p></Link>
          <Link to={`/dashboard`}><p><i className="fa-regular fa-user"></i></p></Link>
          <Link to={`/login`}><button>Login</button></Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar