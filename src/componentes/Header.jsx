import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons"; // ✅ importamos el icono de favoritos
import { useAuth } from "../componentes/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/administracion");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <span className="brand-icon">🛡️</span>
          <span className="brand-text">Arsenal Para Tu Garage</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle-custom" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center navbar-nav-custom">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              🏠 Home
            </Nav.Link>
            <Nav.Link as={Link} to="/naciones" className="nav-link-custom">
              🌍 Naciones
            </Nav.Link>
            <Nav.Link as={Link} to="/tiers" className="nav-link-custom">
              🔥 Tiers
            </Nav.Link>
            <Nav.Link as={Link} to="/todos-tanques" className="nav-link-custom">
              🔍 Todos los Tanques
            </Nav.Link>

            <div className="navbar-actions">
              {/* 🔹 Botón de administración / login */}
              {!user ? (
                <Button
                  as={Link}
                  to="/administracion"
                  className="btn-admin"
                >
                  ⚙️ Administración
                </Button>
              ) : (
                <>
                  <span className="user-greeting">Hola, {user.username}</span>
                  <Button
                    className="btn-logout"
                    onClick={handleLogout}
                  >
                    🚪 Cerrar sesión
                  </Button>
                </>
              )}

              {/* 🔹 Link a favoritos */}
              <Link to="/favoritos" className="icon-link" title="Mis Favoritos">
                <FontAwesomeIcon icon={faHeart} size="lg" />
              </Link>

              {/* 🔹 Link al carrito */}
              <Link to="/carrito" className="icon-link" title="Carrito">
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
