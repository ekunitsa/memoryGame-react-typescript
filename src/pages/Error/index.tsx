import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const PageError: React.FC = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Error page</h1>
                    <p>The page you’re looking for can’t be found.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default PageError;
