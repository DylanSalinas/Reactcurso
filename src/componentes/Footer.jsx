import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

import "@fortawesome/fontawesome-free/css/all.min.css";



const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-4">
            <Container>
                <Row>
                    <Col md={6}>
                        <p className="mb-1">Todo para el tanquista</p>
                    </Col>
                    <Col md={6}>
                        <a href="#" className="text-white me-3" ><i className="fa-brands fa-square-instagram"></i> Instagram</a>
                        <a href="#" className="text-white me-3"><i className="fa-brands fa-tiktok"></i> Tiktok</a>
                        <a href="#" className="text-white me-3"><i className="fa-brands fa-facebook"></i> Facebook</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )

}


export default Footer;
