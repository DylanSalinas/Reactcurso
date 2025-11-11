import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2e/World_of_Tanks_logo.png"
            alt="Logo"
            className="d-inline-block align-top me-2"
            style={{ width: "50px" }}
          />
          <span>Galería de Tanques</span>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/" className="me-3">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/naciones" className="me-3">
            Naciones
          </Nav.Link>
          <Nav.Link as={Link} to="/tiers" className="me-3">
            Tiers
          </Nav.Link>
          <div className="d-flex align-items-center">
            <Button
              variant="outline-light"
              as={Link}
              to="/administracion"
              className="me-2"
            >
              Administración
            </Button>
            <Link to="/carrito" className="text-white">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
