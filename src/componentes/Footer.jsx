import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css'

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-4">
            <Container>
                <Row>
                    <Col md={6}>
                        <p className="mb-0">Nombre por decidir</p>
                        <p className="mb-0">Lugar por decidir</p>
                    </Col>
                    <Col md={6}>
                        <a href="#" className="text-white me-3" ><i class="fa-brands fa-square-instagram"></i> Instagram</a>
                        <a href="#" className="text-white me-3"><i class="fa-brands fa-tiktok"></i> Tiktok</a>
                        <a href="#" className="text-white me-3"><i class="fa-brands fa-facebook"></i> Facebook</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )

}


export default Footer;