import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { SiTrustedshops } from "react-icons/si";
import { useAuth } from "../../context/Auth.js";
import { toast } from "react-hot-toast";
// import Dashboard from "../../pages/user/Dashboard.js";
import SearchInputs from "../form/SearchInputs.js";
import useCategory from "../../hooks/useCategory.js";
import { useCart } from "../../context/cart.js";
import { Badge } from "antd";
import "../../styles/Header.css";

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const category = useCategory();
  // console.log(auth);

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
  const handleNabvar = () => {};

  return (
    <>
      <nav className="navbar">
        {/* <div className="container"> */}
        <div className="logo">
          <NavLink to="/">
            <img src={require("./shoping-logo.png")} alt="logo" id="logo" />
          </NavLink>
        </div>
        <div className="searchInput">
          <SearchInputs />
        </div>
        <div className="itemContainer">
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
                <NavLink to="/cart" className="p-2 cart">
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
        <div className="hamburger" onClick={handleNabvar}>
          <div className="burger"></div>
          <div className="burger"></div>
          <div className="burger"></div>
        </div>
        {/* </div> */}
      </nav>

      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="header container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand nav-link">
              <img
                src={require("./shoping-logo.png")}
                alt="logo"
                className="logo"
              />
            </NavLink>
            <div>
              <SearchInputs />
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
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
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
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

              <li className="nav-item pt-1">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link fw-bold">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Header;
