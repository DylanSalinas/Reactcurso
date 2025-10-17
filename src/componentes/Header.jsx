import React from "react";
import { Link } from 'react-router-dom';
import { NavBar ,Nav, Container, Button} from 'react-bootstrap';
import { faShoppingCart} from '@fontawesome/free-solid-svg-icons';


const Header = ()=>{
    return (
        <NavBar bg="dark" variant="dark" expand="lg" classname="mb-4">
            <Container>
                <NavBar.Brand as={Link} to="/" classname="d-flex align-items-center">
                <img
                src="https://via.placegolder.com/40"
                alt="Logo"
                classname="d-inline-block align-top me-2"
                />
                <span>Nose que poner</span>
                </NavBar.Brand>

                <Nav classname="ms-auto align-items-center">
                    <Nav.Link as={Link} to="/" classname="me-3" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/ofertas" classname="me-3" >Ofertas</Nav.Link>
                    <Nav.Link as={Link} to="/infaltables" classname="me-3" >Infaltables</Nav.Link>
                    <div className="d-flex align-items-center">
                        <Button variant="outline-light" as={Link} to="/administracion" className="me-2">Administración</Button>
                        <Link to="/carrito" className="text-white">
                        <FontAwesomeIcon icon ={faShoppingCart} size="lg"/>
                        </Link>
                    </div>
                </Nav>
             </Container>
        </NavBar>
    );
};
export default Header;