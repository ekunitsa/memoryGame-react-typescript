import React from 'react'
import { Navbar, Container } from "react-bootstrap"

const Header: React.FC = () => {
    return (
        <Navbar className="text-center border-bottom mb-4">
            <Container className="justify-content-center">
                <Navbar.Brand className="fw-bold me-0">Memory Game</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header