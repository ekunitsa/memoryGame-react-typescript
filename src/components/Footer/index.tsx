import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <div className="footer border-top mt-auto">
            <Container>
                <Row className="py-3">
                    <Col sm={6} className="text-start">React, bootstrap, typescript</Col>
                    <Col sm={6} className="text-end">ekunitsa</Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;
