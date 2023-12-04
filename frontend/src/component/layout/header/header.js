import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { fetchUserLogout } from "../../../slice/userSlice";
import Loader from "../../loader/loader";

function Header() {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const onMouseOver = () => {
    setShowDropdown(true);
  };

  const userLogout = () => {
    dispatch(fetchUserLogout());
    setShowLogoutAlert(true);
    setTimeout(() => setShowLogoutAlert(false), 3000);
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <Navbar className="navBar my-text" expand="lg">
            <Container>
              <Navbar.Brand as={Link} to="/" className="nab-brand my-text">
                TradeE<span>.</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="nab-item ml-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/products">
                    Products
                  </Nav.Link>
                  <Nav.Link as={Link} to="/about-us">
                    About Us
                  </Nav.Link>
                  <Nav.Link as={Link} to="/contact-us">
                    Contact Us
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>

              <div className="nav-icon-box">
                <Nav.Link as={Link} to="/search">
                  <FontAwesomeIcon icon={faSearch} />
                </Nav.Link>
                {user ? (
                  <Nav.Link as={Link} to="/login">
                    <div className="user-icon" onMouseOver={onMouseOver}>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <Dropdown
                      className="user-dropdown"
                      show={showDropdown}
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/dashboard">
                          Dashboard
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/profile">
                          Update Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          //   as={Link}
                          onClick={userLogout}
                          //   to="/login"
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/login">
                    <FontAwesomeIcon icon={faUser} />
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Nav.Link>
              </div>
            </Container>
          </Navbar>
          {showLogoutAlert && (
            <div className="alert alert-success logoutAlert" role="alert">
              Successfully Logout
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Header;
