import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth.js";
import { toast } from "react-hot-toast";
import SearchInputs from "../form/SearchInputs.js";
import useCategory from "../../hooks/useCategory.js";
import { useCart } from "../../context/cart.js";
import { Badge } from "antd";
import "../../styles/Header.css";

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const category = useCategory();
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  // handle Logout
  const handleLogout = async () => {
    setAuth({
      ...auth,
      user: null,
    });
    localStorage.removeItem("auth");
    toast.success("User logout successfully");
  };

  // handleNabvar
  const handleMenuList = () => {
    setMenuActive(!menuActive);
  };

  // handle search input
  const handleSearchInput = () => {
    setSearchActive(!searchActive);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/">
            <img src={require("./shoping-logo.png")} alt="logo" id="logo" />
          </NavLink>
        </div>
        <div className="searchBar" onClick={handleSearchInput}>
          Search
        </div>
        {!menuActive ? (
          <div className={!searchActive ? "searchContainer" : ""}>
            <div className="searchInput">
              <SearchInputs />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="humburger" onClick={handleMenuList}>
          <div className="burger"></div>
          <div className="burger"></div>
          <div className="burger"></div>
        </div>
        <div className={!menuActive ? "itemContainer" : ""}>
          <ul className="unorderdList">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/category"}
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {category?.map((c) => (
                  <li key={c._id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <NavLink to="/about">About</NavLink>
            </li>

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ border: "none" }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}

            <li>
              <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="cart">
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
